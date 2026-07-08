const service =
require(
"../services/transformerService" // Import the transformer service to handle business logic for transformer operations
);
const { validateTransformerInput } = require("../validators/requestValidator");
const { parseQuery } = require("../utils/queryParser");

// create a new transformer
exports.createTransformer =
async (
req,
res,
next
)=>{

try{

const validation = validateTransformerInput(req.body);
if (!validation.isValid) {
  return res.status(400).json({ success: false, message: "Validation failed", errors: validation.errors });
}

const data =
await service.create(
req.body
);

res.status(201)
.json({
success:true,
message:"Transformer created successfully",
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

const query = parseQuery(req.query);
const data =
await service.getAll(query);

res.json({
success:true,
count:data.items.length,
page:data.page,
limit:data.limit,
total:data.total,
data:data.items
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