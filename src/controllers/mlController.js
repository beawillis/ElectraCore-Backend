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

// The response shape is already ML-ready even while the backend uses baseline
// rules, so the frontend does not need to change when a model is added.
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

exports.status =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service.getStatus()

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
