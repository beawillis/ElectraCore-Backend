const {
getIO
} =
require(
"../config/socket"
);

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