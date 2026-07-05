const service =
require(
"../services/dashboardService" // Import the dashboard service to handle business logic for dashboard operations
);

// Get overall system statistics including total devices, transformers, and sensor readings
exports.getStats =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.getStats()

});

}

catch(err){

next(err);

}

};

// Get the average health score from the latest sensor readings and determine overall system health status
exports.getHealth =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.getHealth()

});

}

catch(err){

next(err);

}

};

// Get system status including number of online and offline devices and overall uptime percentage
exports.getSystemStatus =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.getSystemStatus()

});

}

catch(err){

next(err);

}

};

// Get recent activity including latest sensor readings and device status changes for dashboard display
exports.getActivity =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.getActivity()

});

}

catch(err){

next(err);

}

};

// Get trends for dashboard charts including recent temperature and health score data points for visualization
exports.getTrends =
async (
req,
res,
next
)=>{

try{

res.json({

success:true,

data:
await service
.getTrends()

});

}

catch(err){

next(err);

}

};