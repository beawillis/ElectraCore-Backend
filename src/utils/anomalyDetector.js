module.exports =
(
features
)=>{

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
features.avgOil<20
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