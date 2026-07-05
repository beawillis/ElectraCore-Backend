const mongoose =
require("mongoose");

const alertSchema =
new mongoose.Schema(
{

transformer:{
type:
mongoose.Schema.Types.ObjectId,
ref:
"Transformer"
},

device:{
type:
mongoose.Schema.Types.ObjectId,
ref:
"Device"
},

type:{
type:String,
required:true
},

message:{
type:String,
required:true
},

severity:{

type:String,

enum:[
"low",
"medium",
"high",
"critical"
],

required:true

},

status:{

type:String,

enum:[
"active",
"acknowledged",
"resolved"
],

default:
"active"

},

createdAt:{
type:Date,
default:Date.now
},

acknowledgedAt:
Date,

resolvedAt:
Date

}
);

module.exports =
mongoose.model(
"Alert",
alertSchema
);