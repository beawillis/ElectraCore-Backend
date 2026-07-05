const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions

// Define the User schema with fields: name, email, password, and role

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Engineer", "Operator"],
      default: "Engineer"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);