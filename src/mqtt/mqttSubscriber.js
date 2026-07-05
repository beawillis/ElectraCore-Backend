const {
connect
} =
require(
"../config/mqtt"
);

const {
handle
} =
require(
"./topicHandlers"
);

exports.start =
()=>{

const client =
connect();

// ESP32 nodes publish telemetry by transformer topic, but the payload still
// contains the database ids needed for storage and dashboard relationships.
client.subscribe(
"transformers/+/sensor"
);

client.on(

"message",

(
topic,
message
)=>{

handle(
topic,
message
);

}

);

};
