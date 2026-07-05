module.exports =
(
history
)=>{

// Convert recent readings into model-friendly summary features. Digital oil
// level becomes a boolean flag because the hardware is a float switch.
const avg =
(
field
)=>
history.reduce(
(a,b)=>
a+(b[field]||0),
0
)
/history.length;

return{

avgTemp:
avg(
"oilTemperature"
),

avgVoltage:
avg(
"voltage"
),

avgCurrent:
avg(
"current"
),

lowOilDetected:
history.some(
(reading)=>reading.oilLevel==="low"
),

avgHealth:
avg(
"healthScore"
)

};

};
