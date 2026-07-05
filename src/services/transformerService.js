const Transformer =
require("../models/Transformer"); // Import the Transformer model for database interactions

// create a new transformer
exports.create =
async (data) => {

return await Transformer.create(data);

};

// get all transformers
exports.getAll =
async () => {

return await Transformer.find();

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