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
async ({ filters = {}, skip = 0, limit = 10, sort = { createdAt: -1 } } = {})=>{

const [items, total] = await Promise.all([
  Device.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("transformer"),
  Device.countDocuments(filters)
]);

return { items, total, page: Math.floor(skip / limit) + 1, limit };

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