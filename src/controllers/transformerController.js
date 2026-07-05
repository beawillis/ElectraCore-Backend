const service =
require(
"../services/transformerService" // Import the transformer service to handle business logic for transformer operations
);

// create a new transformer
exports.createTransformer =
async (
req,
res,
next
)=>{

try{

const data =
await service.create(
req.body
);

res.status(201)
.json({
success:true,
data
});

}
catch(err){

next(err);

}

};

// get all transformers
exports.getTransformers =
async (
req,
res,
next
)=>{

try{

const data =
await service.getAll();

res.json({
success:true,
count:data.length,
data
});

}
catch(err){

next(err);

}

};

// get a single transformer by ID
exports.getTransformer =
async (
req,
res,
next
)=>{

try{

const data =
await service.getById(
req.params.id
);

if(!data){

return res
.status(404)
.json({
success:false,
message:
"Transformer not found"
});

}

res.json({
success:true,
data
});

}
catch(err){

next(err);

}

};

// update a transformer by ID
exports.updateTransformer =
async (
req,
res,
next
)=>{

try{

const data =
await service.update(
req.params.id,
req.body
);

res.json({
success:true,
data
});

}
catch(err){

next(err);

}

};

// delete a transformer by ID
exports.deleteTransformer =
async (
req,
res,
next
)=>{

try{

await service.delete(
req.params.id
);

res.json({

success:true,

message:
"Transformer deleted"

});

}
catch(err){

next(err);

}

};