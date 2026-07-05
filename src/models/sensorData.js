const mongoose =
require("mongoose"); // Import mongoose for MongoDB interactions

// Define SensorData schema
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

temperature:{
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
type:Number
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