const Notification =
require(
"../models/Notification"
);

const delivery =
require(
"../services/notificationDeliveryService"
);

module.exports =
async ()=>{

const pending =

await Notification
.find({

delivered:false

})

.limit(
20
);

for(
const item
of pending
){

await delivery
.send(
item
);

}

console.log(
"Notifications processed"
);

};