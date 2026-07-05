module.exports =
(
history
)=>{

// Placeholder forecast for UI development. Replace with a trained time-series
// model after real transformer history is available.
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
latest.oilTemperature
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
