const service =
require(
"../services/mlService"
);

exports.predict =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.predict(

req.params.id

)

});

}

catch(
err
){

next(
err
);

}

};