const service =
require(
"../services/deviceService" // Import the device service to handle business logic for device operations
);
const { validateDeviceInput } = require("../validators/requestValidator");
const { parseQuery } = require("../utils/queryParser");

// create a new device
exports.registerDevice =
async (
req,
res,
next
)=>{

try{

const validation = validateDeviceInput(req.body);
if (!validation.isValid) {
  return res.status(400).json({ success: false, message: "Validation failed", errors: validation.errors });
}

const data =
await service.create(
req.body
);

res
.status(201)
.json({
success:true,
message:"Device registered successfully",
data
});

}
catch(err){

next(err);

}

};

//  get all devices
exports.getDevices =
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

// get a single device by ID
exports.getDevice =
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

res.json({
success:true,
data
});

}
catch(err){

next(err);

}

};

// update a device by ID
exports.updateDevice =
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

// delete a device by ID
exports.deleteDevice =
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
"Device deleted"

});

}
catch(err){

next(err);

}

};