module.exports =
(
history
)=>{

if(
!history.length
){

return [];

}

const latest =
history[0];

const result=[];

for(
let i=1;
i<=7;
i++
){

result.push({

day:i,

predictedTemperature:

Number(

(
latest.temperature
+
(i*0.5)

)

.toFixed(1)

),

predictedHealth:

Math.max(

0,

latest.healthScore
-
(i*1)

)

});

}

return result;

};