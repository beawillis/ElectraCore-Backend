const Device =
require(
"../models/Device"
);

module.exports =
async ()=>{

const timeout =
Date.now()
-
300000;

await Device
.updateMany(

{

lastSeen:{
$lt:
timeout
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