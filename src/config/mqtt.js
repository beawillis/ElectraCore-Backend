const mqtt =
require(
"mqtt"
);

let client;

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