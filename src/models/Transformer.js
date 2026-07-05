const mongoose = require("mongoose");

// Asset-level state for a monitored distribution transformer.
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

  healthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
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
