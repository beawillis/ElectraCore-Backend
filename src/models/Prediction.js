const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

transformer:{
type:
mongoose.Schema.Types.ObjectId,
ref:
"Transformer"
},

predictionType:{

type:String,

enum:[
"fault",
"health",
"forecast",
"anomaly"
]

},

score:Number,

label:String,

recommendation:String,

features:Object,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Prediction",
schema
);