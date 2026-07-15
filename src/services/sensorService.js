const mongoose = require("mongoose");

const Sensor =
require(
"../models/sensorData"
);

const Device =
require(
"../models/Device"
);

const Transformer = require("../models/Transformer");

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

const socketService =
require(
"./socketService"
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

let deviceRecord = null;

if (deviceIdentifier) {
  deviceRecord = await Device.findOne({ deviceId: deviceIdentifier });

  if (!deviceRecord) {
    let transformerRecord = await Transformer.findOne({ transformerId: payload.transformer || "default-transformer" });

    if (!transformerRecord) {
      transformerRecord = await Transformer.create({
        transformerId: "default-transformer",
        name: "Default Transformer",
        location: "Auto Registered",
        capacity: 100
      });
    }

    deviceRecord = await Device.create({
      deviceId: deviceIdentifier,
      name: `Device ${deviceIdentifier}`,
      deviceType: "esp32",
      transformer: transformerRecord._id,
      firmwareVersion: "1.1.0",
      status: "connected",
      lastSeen: new Date()
    });
  }

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

if (payload.device && typeof payload.device === "string") {
  try {
    payload.device = new mongoose.Types.ObjectId(payload.device);
  } catch (error) {
    payload.device = undefined;
  }
}

const saved =
await Sensor
.create(
payload
);

if (saved.transformer) {
  socketService.emitToRoom(
    saved.transformer.toString(),
    "sensor_reading",
    {
      device: saved.device,
      transformer: saved.transformer,
      oilTemperature: saved.oilTemperature,
      ambientTemperature: saved.ambientTemperature,
      voltage: saved.voltage,
      current: saved.current,
      humidity: saved.humidity,
      oilLevel: saved.oilLevel,
      healthScore: saved.healthScore,
      recordedAt: saved.recordedAt
    }
  );
}

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
