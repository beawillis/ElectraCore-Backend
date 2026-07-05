module.exports =
({
temperature,
voltage,
current,
oilLevel
})=>{

let score=100;

if(
temperature>80
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
oilLevel<20
)
score-=35;

return Math.max(
0,
score
);

};