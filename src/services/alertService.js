const Alert =
require("../models/Alert");

const Notification =
require(
"./notificationService"
);

exports.create =
async (
payload
)=>{

const alert =
await Alert
.create(
payload
);

// Every alert becomes an in-app/system notification; high-risk alerts also
// queue external delivery channels.
await Notification
.send({

title:
payload.type,

message:
payload.message,

alert:
alert._id,

channel:
"system"

});

if(
["high","critical"].includes(payload.severity)
){

await Notification.send({

title:
payload.type,

message:
payload.message,

alert:
alert._id,

channel:
"email"

});

await Notification.send({

title:
payload.type,

message:
payload.message,

alert:
alert._id,

channel:
"sms"

});

}

return alert;

};

exports.getAll =
async ()=>{

return await Alert
.find()
.populate(
"transformer device"
)
.sort({
createdAt:-1
});

};

exports.acknowledge =
async (
id
)=>{

return await Alert
.findByIdAndUpdate(

id,

{

status:
"acknowledged",

acknowledgedAt:
new Date()

},

{
new:true
}

);

};

exports.resolve =
async (
id
)=>{

return await Alert
.findByIdAndUpdate(

id,

{

status:
"resolved",

resolvedAt:
new Date()

},

{
new:true
}

);

};
