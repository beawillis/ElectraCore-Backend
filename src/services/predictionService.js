const Prediction =
require(
"../models/Prediction"
);

exports.save =
async (
data
)=>{

// Prediction history is stored even for baseline rules so later dashboards can
// compare pre-ML and trained-model behavior.
return await
Prediction
.create(
data
);

};
