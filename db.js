const mongoose = require('mongoose');
let dbconf;
if (process.env.MONGODB_URI){
    dbconf = process.env.MONGODB_URI;
} else{
    dbconf = 'mongodb://localhost/hbp253';
}
mongoose.connect(dbconf).catch((err)=>console.log(err)).then(console.log('db connected!'));