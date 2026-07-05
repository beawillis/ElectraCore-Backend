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

// Boot order matters: connect storage, create HTTP/socket servers, then start
// MQTT and scheduled jobs that depend on the app services.
connectDB();

const server =
http.createServer(
app
);

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

mqtt.start();

scheduler.start();

server.listen(

process.env.PORT,

()=>{

console.log(

`Server running ${process.env.PORT}`

);

}
);
