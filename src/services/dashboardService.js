const Device =
require("../models/Device"); // Import the Device model for database interactions

const Transformer =
require("../models/Transformer"); // Import the Transformer model for database interactions

const Sensor =
require("../models/SensorData"); // Import the Sensor model for database interactions

// Get overall system statistics including total devices, transformers, and sensor readings
exports.getStats =
async ()=>{

const [
devices,
transformers,
readings
]=await Promise.all([

Device.countDocuments(),

Transformer.countDocuments(),

Sensor.countDocuments()

]);

return{

devices,

transformers,

sensorReadings:
readings

};

};

// Get the average health score from the latest sensor readings and determine overall system health status
exports.getHealth =
async ()=>{

const latest =
await Sensor
.find()
.sort({
recordedAt:-1
})
.limit(50);

if(!latest.length){

return{

average:0,

status:
"no-data"

};

}

const average =
latest.reduce(
(
a,
b
)=>
a+
(
b.healthScore||0
),
0
)
/latest.length;

return{

average:
Number(
average
.toFixed(1)
),

status:
average>80
?
"healthy"
:
average>50
?
"warning"
:
"critical"

};

};

// Get system status including number of online and offline devices and overall uptime percentage
exports.getSystemStatus =
async ()=>{

const online =
await Device
.countDocuments({
status:
"connected"
});

const total =
await Device
.countDocuments();

return{

online,

offline:
total-online,

uptime:
total
?
(
online/
total
)*100
:
0

};

};

// Get recent activity including latest sensor readings and device status changes for dashboard display
exports.getActivity =
async ()=>{

return await Sensor
.find()
.populate(
"transformer"
)
.limit(20)
.sort({
createdAt:-1
});

};

// Get trends for dashboard charts including recent temperature and health score data points for visualization
exports.getTrends =
async ()=>{

const data=
await Sensor
.find()
.limit(100)
.sort({
recordedAt:-1
});

return data.map(
(r)=>({

time:
r.recordedAt,

temperature:
r.temperature,

health:
r.healthScore

})
);

};