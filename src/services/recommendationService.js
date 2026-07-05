exports.generate =
(
risk
)=>{

// Keep recommendations deterministic and simple until field data justifies a
// trained maintenance classifier.
if(
risk>70
)
return "Immediate inspection required";

if(
risk>40
)
return "Schedule maintenance";

return "Continue monitoring";

};
