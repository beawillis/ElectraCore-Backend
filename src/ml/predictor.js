exports.predict =
(
features
)=>{

let risk=0;

if(
features.avgTemp>75
)
risk+=35;

if(
features.avgCurrent>90
)
risk+=20;

if(
features.avgVoltage>250
)
risk+=20;

if(
features.avgOil<25
)
risk+=25;

return{

risk,

label:
risk>70
?
"critical"
:
risk>40
?
"warning"
:
"healthy"

};

};