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