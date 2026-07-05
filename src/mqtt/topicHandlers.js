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