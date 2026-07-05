const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions

// Define the Transformer schema with fields: transformerId, name, location, capacity, status, and installationDate
const transformerSchema =
new mongoose.Schema( 
{
  transformerId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  status: {
    type: String,

    enum: [
      "healthy",
      "warning",
      "critical"
    ],

    default: "healthy"
  },

  installationDate: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
});

module.exports =
mongoose.model(
"Transformer",
transformerSchema
);