const nodemailer =
require(
"nodemailer"
);

const Notification =
require(
"../models/Notification"
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