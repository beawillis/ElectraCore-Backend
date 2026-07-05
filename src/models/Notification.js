const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

// Notifications are queued records. Delivery jobs mark them delivered after
// email, SMS gateway, or in-app handling succeeds.
title:String,

message:String,

channel:{

type:String,

enum:[
"system",
"email",
"sms"
],

default:
"system"

},

alert:{

type:
mongoose.Schema.Types.ObjectId,

ref:
"Alert"

},

delivered:{
type:Boolean,
default:false
},

deliveredAt:
Date,

sentAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Notification",
schema
);
