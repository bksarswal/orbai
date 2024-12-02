const mongoose = require('mongoose');

const schema = new mongoose.Schema({

 name:{
    type:String,
    required:true
 },

 email:{type:String,
    required:true,
    unique:true
 },phone:{


    type:String,
    required:true,
    unique:true
 },password:{

type:String,
required:true,
unique:true
 }

})
const user = mongoose.model('dcmbr',schema);

module.exports=user;