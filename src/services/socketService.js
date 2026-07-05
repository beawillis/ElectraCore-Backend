const {
getIO
} =
require(
"../config/socket"
);

// Thin wrapper around Socket.IO so MQTT handlers and services do not need to
// know how the realtime server is initialized.
exports.broadcast =
(
event,
payload
)=>{

getIO()
.emit(
event,
payload
);

};

exports.emitToRoom =
(
room,
event,
payload
)=>{

getIO()
.to(room)
.emit(
event,
payload
);

};
