exports.transform =
(
features
)=>{

// Feature order must match the future Python training pipeline exactly.
return [

features.avgTemp,

features.avgVoltage,

features.avgCurrent,

features.lowOilDetected ? 1 : 0,

features.avgHealth

];

};
