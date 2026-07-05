const Notification =
require(
"../models/Notification"
);

exports.send =
async (
payload
)=>{

return await
Notification
.create(
payload
);

};