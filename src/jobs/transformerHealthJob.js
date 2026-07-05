const Sensor =
require(
"../models/SensorData"
);

const Transformer =
require(
"../models/Transformer"
);

module.exports =
async ()=>{

const sensors =
await Sensor
.find();

const grouped={};

for(
const s
of sensors
){

const id =
String(
s.transformer
);

if(
!grouped[id]
){

grouped[id]=[];

}

grouped[id]
.push(
s.healthScore
);

}

for(
const id
in grouped
){

const avg =

grouped[id]
.reduce(
(
a,
b
)=>
a+b
)
/
grouped[id]
.length;

await Transformer
.findByIdAndUpdate(

id,

{

healthScore:
avg

}

);

}

console.log(
"Health updated"
);

};