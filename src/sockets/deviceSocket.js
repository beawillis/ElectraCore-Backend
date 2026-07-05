module.exports =
(
socket
)=>{

socket.on(

"device:online",

(
id
)=>{

console.log(
id
);

}

);

};