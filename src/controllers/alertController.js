const service =
require(
"../services/alertService"
);

exports.getAlerts =
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
.getAll()

});

}

catch(err){

next(err);

}

};

exports.acknowledge =
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
.acknowledge(
req.params.id
)

});

}

catch(err){

next(err);

}

};

exports.resolve =
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
.resolve(
req.params.id
)

});

}

catch(err){

next(err);

}

};