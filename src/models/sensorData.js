const mongoose =
require("mongoose");

// One telemetry sample from an ESP32 device. oilLevel is digital because the
// hardware uses a float switch, not an analog level sensor.
const sensorSchema =
new mongoose.Schema(
{

transformer:{

type:
mongoose.Schema.Types.ObjectId,

ref:
"Transformer",

required:true
},

device:{

type:
mongoose.Schema.Types.ObjectId,

ref:
"Device",

required:true
},

oilTemperature:{
type:Number
},

ambientTemperature:{
type:Number
},

voltage:{
type:Number
},

current:{
type:Number
},

humidity:{
type:Number
},

oilLevel:{
type:String,
enum:[
"high",
"low"
]
},

healthScore:{
type:Number
},

recordedAt:{

type:Date,

default:
Date.now

}

},
{
timestamps:true
}
);

module.exports =
mongoose.model(
"SensorData",
sensorSchema
);
