const mqtt =
require(
"../services/mqttService"
);

// Outbound topics are kept here so relay/GSM/device command contracts stay
// visible outside the business services.
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

exports.publishProtectionCommand =
(
device,
command
)=>{

mqtt.publish(

`devices/${device}/protection`,

command

);

};
