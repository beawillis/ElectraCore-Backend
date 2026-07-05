const {
getClient
} =
require(
"../config/mqtt"
);

exports.publish =
(
topic,
message
)=>{

// Return false instead of throwing so alert/protection workflows can continue
// even if the broker is temporarily unavailable.
const client =
getClient();

if(
!client
){

console.log(
`MQTT publish skipped, client not connected: ${topic}`
);

return false;

}

client
.publish(

topic,

JSON.stringify(
message
)

);

return true;

};
