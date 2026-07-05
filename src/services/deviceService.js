const Device =
require("../models/Device"); // Import the Device model for database interactions

// create a new device
exports.create =
async (data)=>{

return await Device.create(
data
);

};

// get all devices
exports.getAll =
async ()=>{

return await Device
.find()
.populate(
"transformer"
);

};

// get a single device by ID
exports.getById =
async (id)=>{

return await Device
.findById(id)
.populate(
"transformer"
);

};

// update a device by ID
exports.update =
async (
id,
data
)=>{

return await Device
.findByIdAndUpdate(
id,
data,
{
new:true
}
);

};

// delete a device by ID
exports.delete =
async (id)=>{

return await Device
.findByIdAndDelete(
id
);

};