const Notification =
require(
"../models/Notification"
);

exports.send =
async (
payload
)=>{

// Creation and delivery are separate: jobs can retry undelivered notifications
// without recreating the original alert.
return await
Notification
.create(
payload
);

};
