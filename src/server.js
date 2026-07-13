const http =
require(
"http"
);

const app =
require(
"./app"
);

const scheduler =
require(
"./config/scheduler"
);

const connectDB =
require(
"./config/database"
);

const {
initialize
} =
require(
"./config/socket"
);

const mqtt =
require(
"./mqtt/mqttSubscriber"
);

require("dotenv")
.config();

// Load environment variables and connect to the database first
// so the rest of the app can use persistent storage safely.
connectDB();

// Create the HTTP server using the Express app instance
const server =
http.createServer(
app
);

// Initialize Socket.IO and attach it to the HTTP server
const io =
initialize(
server
);

io.on(

"connection",

(
socket
)=>{

console.log(
"Client connected"
);

// Socket modules register event listeners for each dashboard concern.
require(
"./sockets/sensorSocket"
)(
socket
);

require(
"./sockets/alertSocket"
)(
socket
);

require(
"./sockets/deviceSocket"
)(
socket
);

}

);

// Start MQTT subscription to ingest real-time device and sensor data.
mqtt.start();

// Start scheduled background jobs for cleanup, health checks, and notifications.
scheduler.start();

// Begin listening for HTTP traffic on the configured port.
server.listen(

process.env.PORT,

()=>{

console.log(

`Server running ${process.env.PORT}`

);

}
);
