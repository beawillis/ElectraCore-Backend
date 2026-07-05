const mongoose =
require("mongoose"); // Import mongoose for MongoDB interactions

// Define the Device schema with fields: deviceId, name, deviceType, transformer, firmwareVersion, status, and lastSeen
const deviceSchema =
new mongoose.Schema(
{

deviceId: {
type: String,
required: true,
unique: true
},

name: {
type: String,
required: true
},

deviceType: {
type: String,

enum: [
"esp32" // Add other device types as needed
],

default: "esp32"
},

transformer: {

type:
mongoose.Schema.Types.ObjectId,

ref:
"Transformer",

required: true
},

firmwareVersion: {
type: String,
default: "1.0.0"
},

status: {

type: String,

enum: [
"connected",
"offline",
"maintenance"
],

default: "offline"
},

lastSeen: {
type: Date
}

},
{
timestamps: true
}
);

module.exports =
mongoose.model(
"Device",
deviceSchema
);