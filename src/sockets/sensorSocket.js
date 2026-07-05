module.exports =
(
socket
)=>{

socket.on(

"subscribe_transformer",

(
id
)=>{

socket.join(
id
);

}

);

socket.on(

"unsubscribe_transformer",

(
id
)=>{

socket.leave(
id
);

}

);

};