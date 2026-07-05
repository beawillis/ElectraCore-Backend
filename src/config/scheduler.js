const cron =
require(
"node-cron"
);

exports.start =
()=>{

// Jobs are intentionally centralized here so maintenance intervals are visible
// in one place as the system grows.
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
"../jobs/alertCleanupjob"
)

);

console.log(
"Scheduler started"
);

};
