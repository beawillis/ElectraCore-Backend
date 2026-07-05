module.exports =
(
history
)=>{

const avg =
(
field
)=>
history.reduce(
(a,b)=>
a+b[field],
0
)
/history.length;

return{

avgTemp:
avg(
"temperature"
),

avgVoltage:
avg(
"voltage"
),

avgCurrent:
avg(
"current"
),

avgOil:
avg(
"oilLevel"
),

avgHealth:
avg(
"healthScore"
)

};

};