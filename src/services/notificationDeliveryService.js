const nodemailer =
require(
"nodemailer"
);

const Notification =
require(
"../models/Notification"
);

const mqtt =
require(
"./mqttService"
);

const transporter =
nodemailer.createTransport({

host:
process.env.EMAIL_HOST,

port:
process.env.EMAIL_PORT,

secure:false,

auth:{

user:
process.env.EMAIL_USER,

pass:
process.env.EMAIL_PASS

}

});

exports.send =
async (
notification
)=>{

try{

// Email is delivered directly from the backend using SMTP credentials.
if(
notification.channel
===
"email"
){

await transporter
.sendMail({

from:
process.env.EMAIL_USER,

to:
process.env.ADMIN_EMAIL,

subject:
notification.title,

text:
notification.message

});

}

if(
notification.channel
===
"sms"
){

// SMS is queued through MQTT so an ESP32/SIM800L gateway can send the text.
mqtt.publish(

"gsm/alerts",

{
title:
notification.title,

message:
notification.message,

to:
process.env.ADMIN_PHONE
}

);

}

await Notification
.findByIdAndUpdate(

notification._id,

{

delivered:true,

deliveredAt:
new Date()

}

);

}
catch(
err
){

console.log(
err.message
);

}

};
