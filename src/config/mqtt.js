const mqtt =
require(
"mqtt"
);

let client;

// Keep a single MQTT client for subscribers and publishers so protection
// commands and GSM messages share the same broker connection.
exports.connect =
()=>{

client =
mqtt.connect(

process.env
.MQTT_URL

);

client.on(
"connect",

()=>{

console.log(
"MQTT connected"
);

}

);

return client;

};

exports.getClient =
()=>client;
