const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI; // support either variable name
    await mongoose.connect(mongoUri);
    console.log("Database Connected");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;