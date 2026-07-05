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

getClient()
.publish(

topic,

JSON.stringify(
message
)

);

};