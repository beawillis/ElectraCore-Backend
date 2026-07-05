module.exports =
({
oilTemperature,
voltage,
current,
oilLevel
})=>{

// Health is a simple protective score, not an ML result. It should stay easy
// to audit because operators may rely on it during faults.
let score=100;

if(
oilTemperature>80
)
score-=25; 

if(
voltage>260
)
score-=20;

if(
current>100
)
score-=20; 

if(
oilLevel==="low"
)
score-=35;

return Math.max(
0,
score
);

};
