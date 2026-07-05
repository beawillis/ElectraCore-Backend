const sensorService =
require(
"../services/sensorService"
);

const socket =
require(
"../services/socketService"
);

exports.handle =
async (
topic,
payload
)=>{

try{

// MQTT messages are expected to use the same JSON body as the HTTP ingest API.
const data =
JSON.parse(
payload
.toString()
);

const reading =
await sensorService
.ingest(
data
);

// Keep dashboards live without requiring polling after every sensor packet.
socket.broadcast(

"transformer:update",

reading

);

socket.broadcast(

"dashboard:update",

{
received:true
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
