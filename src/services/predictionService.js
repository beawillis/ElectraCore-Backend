const Prediction =
require(
"../models/Prediction"
);

exports.save =
async (
data
)=>{

return await
Prediction
.create(
data
);

};