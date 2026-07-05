module.exports =
(data)=>{

const alerts=[];

// These thresholds are the deterministic protection layer. They should remain
// active even after ML is added, because they protect against immediate danger.
if(
data.oilTemperature>80
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
data.oilTemperature === undefined ||
data.voltage === undefined ||
data.current === undefined ||
data.oilLevel === undefined
){

// Missing required readings are treated as a sensor fault instead of silently
// accepting incomplete telemetry.
alerts.push({

type:
"SENSOR_FAILURE",

severity:
"high",

message:
"Required sensor reading is missing"

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
data.voltage<180
){

alerts.push({

type:
"UNDERVOLTAGE",

severity:
"high",

message:
"Voltage below safe threshold"

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
data.oilLevel==="low"
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
