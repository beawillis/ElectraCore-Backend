const Device =
require(
"../models/Device"
);

const Alert =
require(
"../models/Alert"
);

const alertService =
require(
"../services/alertService"
);

module.exports =
async ()=>{

const timeout =
Date.now()
-
300000;

// Devices that stop reporting for five minutes are marked offline and produce
// one active communication-loss alert for dashboard history and notifications.
const staleDevices =
await Device.find(

{

lastSeen:{
$lt:
timeout
},

status:{
$ne:
"offline"
}

}

);

for(
const device
of staleDevices
){

const existing =
await Alert.findOne({

device:
device._id,

type:
"COMMUNICATION_LOSS",

status:
"active"

});

if(
!existing
){

await alertService.create({

transformer:
device.transformer,

device:
device._id,

type:
"COMMUNICATION_LOSS",

message:
"Device has stopped sending heartbeat or sensor readings",

severity:
"high"

});

}

}

await Device.updateMany(

{

_id:{
$in:
staleDevices.map(
(device)=>device._id
)
}

},

{

status:
"offline"

}

);

console.log(
"Heartbeat checked"
);

};
