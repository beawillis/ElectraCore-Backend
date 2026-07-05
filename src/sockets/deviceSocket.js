module.exports =
(
socket
)=>{

// Placeholder for future device presence events initiated from dashboards or
// authenticated device management clients.
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
