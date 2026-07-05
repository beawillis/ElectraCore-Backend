module.exports =
(
socket
)=>{

// Dashboard clients join this room when they only need alert stream updates.
socket.on(

"alerts:subscribe",

()=>{

socket.join(
"alerts"
);

}

);

};
