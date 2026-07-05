const Sensor =
require(
"../models/SensorData"
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

/*
Ingest sensor data
Calculate health
Store reading
Generate alerts
*/

exports.ingest =
async (
payload
)=>{

// Calculate health score
payload.healthScore =
calculateHealth(
payload
);

// Save reading
const saved =
await Sensor
.create(
payload
);

// Evaluate alert rules
const alerts =
rules(
payload
);

// Generate alerts
for(
const alert
of alerts
){

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