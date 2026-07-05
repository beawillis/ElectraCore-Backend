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