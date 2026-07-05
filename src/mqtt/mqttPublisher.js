const mqtt =
require(
"../services/mqttService"
);

exports.publishAlert =
(
alert
)=>{

mqtt.publish(

"alerts/critical",

alert

);

};

exports.publishStatus =
(
device
)=>{

mqtt.publish(

`devices/${device}/status`,

{

online:true

}

);

};