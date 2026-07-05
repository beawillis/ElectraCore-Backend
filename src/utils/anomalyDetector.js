module.exports =
(
features
)=>{

// Lightweight anomaly labels for current dashboards; trained anomaly detection
// can replace this once enough clean history exists.
const anomalies=[];

if(
features.avgTemp>85
){

anomalies.push(
"High temperature"
);

}

if(
features.avgVoltage>260
){

anomalies.push(
"Voltage spike"
);

}

if(
features.avgCurrent>100
){

anomalies.push(
"Current overload"
);

}

if(
features.lowOilDetected
){

anomalies.push(
"Low oil"
);

}

return{

detected:
anomalies.length>0,

anomalies

};

};
