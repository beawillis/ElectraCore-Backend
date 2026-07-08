const Transformer =
require("../models/Transformer"); // Import the Transformer model for database interactions

// create a new transformer
exports.create =
async (data) => {

return await Transformer.create(data);

};

// get all transformers
exports.getAll =
async ({ filters = {}, skip = 0, limit = 10, sort = { createdAt: -1 } } = {}) => {

const [items, total] = await Promise.all([
  Transformer.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit),
  Transformer.countDocuments(filters)
]);

return { items, total, page: Math.floor(skip / limit) + 1, limit };

};

// get a single transformer by ID
exports.getById =
async (id) => {

return await Transformer.findById(id);

};

// update a transformer by ID
exports.update =
async (
id,
data
) => {

return await Transformer.findByIdAndUpdate(
id,
data,
{
new:true,
runValidators:true
}
);

};

// delete a transformer by ID
exports.delete =
async (id) => {

return await Transformer.findByIdAndDelete(
id
);

};