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

const { getTransformerRoomNames } = require("../utils/transformerRoom");

exports.resolveTransformerReference = async (transformerIdentifier) => {
  const normalizedIdentifier =
    transformerIdentifier && typeof transformerIdentifier === "string"
      ? transformerIdentifier.trim()
      : transformerIdentifier;

  const fallbackIdentifier = normalizedIdentifier || "default-transformer";

  let transformerRecord = null;

  if (normalizedIdentifier) {
    const query = {
      $or: [
        { _id: normalizedIdentifier },
        { transformerId: normalizedIdentifier }
      ]
    };

    transformerRecord = await Transformer.findOne(query);
  } else {
    transformerRecord = await Transformer.findOne({ transformerId: fallbackIdentifier });
  }

  if (!transformerRecord) {
    transformerRecord = await Transformer.create({
      transformerId: fallbackIdentifier,
      name: fallbackIdentifier === "default-transformer" ? "Default Transformer" : fallbackIdentifier,
      location: "Auto Registered",
      capacity: 100
    });
  }

  return transformerRecord;
};

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

const transformerRecord = await exports.resolveTransformerReference(
  payload.transformer || payload.transformerId || "default-transformer"
);

payload.transformer = transformerRecord._id;
payload.transformerDetails = transformerRecord;
payload.transformerId = transformerRecord.transformerId;

// A valid reading is treated as the device heartbeat.
const deviceIdentifier = payload.device;

let deviceRecord = null;

if (deviceIdentifier) {
  deviceRecord = await Device.findOne({ deviceId: deviceIdentifier });

  if (!deviceRecord) {
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
  const transformerRooms = getTransformerRoomNames(payload.transformerDetails || saved.transformer);

  if (transformerRooms.length) {
    const payloadToEmit = {
      device: saved.device,
      transformer: saved.transformer,
      transformerId: payload.transformerDetails?.transformerId || payload.transformerId,
      oilTemperature: saved.oilTemperature,
      ambientTemperature: saved.ambientTemperature,
      voltage: saved.voltage,
      current: saved.current,
      humidity: saved.humidity,
      oilLevel: saved.oilLevel,
      healthScore: saved.healthScore,
      recordedAt: saved.recordedAt
    };

    for (const room of transformerRooms) {
      socketService.emitToRoom(room, "sensor_reading", payloadToEmit);
    }
  }
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

exports.getLatestByTransformer =
async (
id
)=>{

return await Sensor
.findOne({

transformer:id

})

.populate(
"transformer device"
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
