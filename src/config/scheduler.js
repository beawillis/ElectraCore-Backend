const cron =
require(
"node-cron"
);

exports.start =
()=>{

cron.schedule(

"*/1 * * * *",

require(
"../jobs/notificationJob"
)

);

cron.schedule(

"*/5 * * * *",

require(
"../jobs/deviceHeartbeatJob"
)

);

cron.schedule(

"0 * * * *",

require(
"../jobs/transformerHealthJob"
)

);

cron.schedule(

"0 0 * * *",

require(
"../jobs/alertCleanupJob"
)

);

console.log(
"Scheduler started"
);

};