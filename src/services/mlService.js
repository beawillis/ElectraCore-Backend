const Sensor =
require(
"../models/sensorData"
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

// Until a trained model is available, this endpoint exposes the baseline
// rule-based risk score in an ML-compatible response shape for the frontend.
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

const recommendationText =
recommendation.generate(
result.risk
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
recommendationText

});

return {

mlEnabled:
result.mlEnabled,

modelType:
result.modelType,

status:
"placeholder",

message:
result.message,

risk:
result.risk,

label:
result.label,

confidence:
result.confidence,

recommendation:
recommendationText,

features,

prediction:
saved

};

};

exports.getStatus =
async ()=>{

const readings =
await Sensor.countDocuments();

// This tells the UI exactly what is available now and what must happen before
// trained anomaly detection can be enabled.
return {

mlEnabled:
false,

modelType:
"baseline_rules",

trainingStatus:
"not_started",

minimumRecommendedReadings:
1000,

availableReadings:
readings,

modelPath:
"src/ml/models/anomaly_model.pkl",

datasetPath:
"src/ml/datasets/sensor_history.csv",

nextStep:
"Collect sensor history, export readings to CSV, train IsolationForest, then deploy anomaly_model.pkl.",

message:
"ML placeholder is active. The backend is using baseline rule-based risk scoring until a trained model is available."

};

};
