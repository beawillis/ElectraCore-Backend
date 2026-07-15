const Sensor =
require(
"../models/sensorData"
);

const Device =
require(
"../models/Device"
);

const calculateHealth =
require(
"../utils/calculateHealth"
);

const rules =
require(
"../utils/alertRules"
);

const alertService =
require(
"./alertService"
);

const validator =
require(
"../validators/sensorValidator"
);

const mqttPublisher =
require(
"../mqtt/mqttPublisher"
);

exports.ingest =
async (
payload
)=>{

// Every ingestion path, MQTT or HTTP, passes through the same validation and
// protection pipeline so stored readings and alerts behave consistently.
payload =
validator.validateAndNormalize(
payload
);

payload.healthScore =
calculateHealth(
payload
);

// A valid reading is treated as the device heartbeat.
const deviceIdentifier = payload.device;

if (deviceIdentifier) {
  const deviceRecord = await Device.findOne({ deviceId: deviceIdentifier });

  if (deviceRecord) {
    await Device.findByIdAndUpdate(
      deviceRecord._id,
      {
        status: "connected",
        lastSeen: new Date()
      }
    );

    payload.device = deviceRecord._id;
  }
}

const saved =
await Sensor
.create(
payload
);

const alerts =
rules(
payload
);

for(
const alert
of alerts
){

const created =
await alertService
.create({

transformer:
payload.transformer,

device:
payload.device,

type:
alert.type,

message:
alert.message,

severity:
alert.severity

});

if(
alert.severity==="critical"
){

// Relay isolation remains rule-based for safety; ML should only advise until
// it is trained and validated with real transformer history.
mqttPublisher.publishProtectionCommand(
payload.device,
{
action:"ISOLATE_RELAY",
reason:alert.type,
alert:created._id
}
);

}

}

// Return stored reading
return saved;

};

/*
Get all readings
*/

exports.getAll =
async ()=>{

return await Sensor
.find()

.populate(
"transformer"
)

.populate(
"device"
)

.sort({

recordedAt:-1

});

};

/*
Get readings
for one transformer
*/

exports.getByTransformer =
async (
id
)=>{

return await Sensor
.find({

transformer:id

})

.populate(
"device"
)

.limit(
100
)

.sort({

recordedAt:-1

});

};

/*
Get readings
for one device
*/

exports.getByDevice =
async (
id
)=>{

return await Sensor
.find({

device:id

})

.limit(
100
)

.sort({

recordedAt:-1

});

};

/*
Latest reading
*/

exports.getLatest =
async ()=>{

return await Sensor

.findOne()

.sort({

recordedAt:-1

})

.populate(
"transformer device"
);

};

/*
Delete reading
*/

exports.delete =
async (
id
)=>{

return await Sensor
.findByIdAndDelete(
id
);

};
