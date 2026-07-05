exports.generate =
(
risk
)=>{

if(
risk>70
)
return
"Immediate inspection required";

if(
risk>40
)
return
"Schedule maintenance";

return
"Continue monitoring";

};