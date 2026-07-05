const nodemailer =
require(
"nodemailer"
);

const {
Resend
} =
require(
"resend"
);

const Notification =
require(
"../models/Notification"
);

const mqtt =
require(
"./mqttService"
);

const resend =
process.env.RESEND_API_KEY
?
new Resend(
process.env.RESEND_API_KEY
)
:
null;

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

const sendEmail =
async (
notification
)=>{

const to =
process.env.ADMIN_EMAIL;

const from =
process.env.RESEND_FROM_EMAIL
||
process.env.EMAIL_FROM
||
process.env.EMAIL_USER;

if(
resend
){

const {
error
} =
await resend.emails.send({

from,

to:[
to
],

subject:
notification.title,

text:
notification.message,

html:
`<strong>${notification.title}</strong><p>${notification.message}</p>`

});

if(
error
){

throw new Error(
error.message
||
"Resend email delivery failed"
);

}

return;

}

await transporter
.sendMail({

from,

to,

subject:
notification.title,

text:
notification.message

});

};

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

// Resend is preferred when configured; SMTP remains as a local/fallback option.
await sendEmail(
notification
);

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
