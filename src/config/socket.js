const {
Server
} =
require(
"socket.io"
);

let io;

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