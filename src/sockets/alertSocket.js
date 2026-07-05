module.exports =
(
socket
)=>{

socket.on(

"alerts:subscribe",

()=>{

socket.join(
"alerts"
);

}

);

};