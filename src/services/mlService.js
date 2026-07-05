const Sensor =
require(
"../models/SensorData"
);

const extract =
require(
"../utils/featureExtractor"
);

const predictor =
require(
"../ml/predictor"
);

const recommendation =
require(
"./recommendationService"
);

const prediction =
require(
"./predictionService"
);

exports.predict =
async (
transformerId
)=>{

const history =
await Sensor
.find({

transformer:
transformerId

})

.limit(
200
);

if(
!history.length
){

throw new Error(
"No sensor history"
);

}

const features =
extract(
history
);

const result =
predictor
.predict(
features
);

const saved =
await prediction
.save({

transformer:
transformerId,

predictionType:
"fault",

score:
result.risk,

label:
result.label,

features,

recommendation:
recommendation
.generate(
result.risk
)

});

return saved;

};