const Alert =
require(
"../models/Alert"
);

module.exports =
async ()=>{

// Keep resolved fault history for recent reporting, then remove old resolved
// alerts so the active operations database does not grow forever.
const cutoff =
new Date();

cutoff.setDate(
cutoff.getDate()
-
30
);

await Alert
.deleteMany({

status:
"resolved",

resolvedAt:{
$lt:
cutoff
}

});

console.log(
"Old alerts removed"
);
};
