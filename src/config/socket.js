const {
Server
} =
require(
"socket.io"
);

let io;

// Socket.IO is attached to the same HTTP server as Express so dashboard clients
// can receive live telemetry and alert updates from one backend process.
exports.initialize =
(server)=>{

io =
new Server(
server,
{

cors:{
origin:"*"
}

}
);

console.log(
"Socket.IO started"
);

return io;

};

exports.getIO =
()=>{

if(!io){

throw new Error(
"Socket not initialized"
);

}

return io;

};
