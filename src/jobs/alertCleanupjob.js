const Alert =
require(
"../models/Alert"
);

module.exports =
async ()=>{

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