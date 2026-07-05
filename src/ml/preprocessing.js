exports.transform =
(
features
)=>{

return [

features.avgTemp,

features.avgVoltage,

features.avgCurrent,

features.avgOil,

features.avgHealth

];

};