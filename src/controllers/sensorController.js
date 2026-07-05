const service =
require(
"../services/sensorService"
); // Import the sensor service to handle business logic for sensor data operations

// ingest new sensor data, calculate health score, and save to the database
exports.ingest =
async (
req,
res,
next
)=>{

try{

const data=
await service
.ingest(
req.body
);

res
.status(201)
.json({

success:true,

message:
"Sensor data received",

data

});

}

catch(err){

next(err);

}

};

// retrieve all sensor data, populate related transformer and device information, and sort by recorded date
exports.getReadings =
async (
req,
res,
next
)=>{

try{

const data=
await service
.getAll();

res.json({

success:true,

count:
data.length,

data

});

}

catch(err){

next(err);

}

};

// retrieve sensor data for a specific transformer
exports.getTransformerData =
async (
req,
res,
next
)=>{

try{

const data=
await service
.getByTransformer(
req.params.id
);

res.json({

success:true,

data

});

}

catch(err){

next(err);

}

};