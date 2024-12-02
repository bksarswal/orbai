const mongoose = require('mongoose');

 mongoose.connect('mongodb://127.0.0.1:27017/decimber');

 const db = mongoose.connection;

db.on('err',()=>{
console.log("something went rong mongoose culd't connect ");
}
)

db.once('open',()=>{


    console.log('mongodb conected successfully');
})


module.exports=db;
