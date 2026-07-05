module.exports =
(data)=>{

const alerts=[];

if(
data.temperature>80
){

alerts.push({

type:
"TEMPERATURE",

severity:
"critical",

message:
"Transformer temperature exceeded threshold"

});

}

if(
data.voltage>260
){

alerts.push({

type:
"VOLTAGE",

severity:
"high",

message:
"Voltage above safe threshold"

});

}

if(
data.current>100
){

alerts.push({

type:
"CURRENT",

severity:
"medium",

message:
"Current overload detected"

});

}

if(
data.oilLevel<20
){

alerts.push({

type:
"OIL",

severity:
"critical",

message:
"Oil level critically low"

});

}

return alerts;

};