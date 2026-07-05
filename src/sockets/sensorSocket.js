module.exports =
(
socket
)=>{

// Transformer-specific rooms let the dashboard watch one asset without
// receiving every sensor update in the system.
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
