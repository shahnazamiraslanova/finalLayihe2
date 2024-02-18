const mongoose=require('mongoose');
 const MagicUsersSchema=mongoose.Schema({
    name:String,
    lastName:String,
    username:String,
    email:String,
    password:String

 });

 

 module.exports=mongoose.model("users",MagicUsersSchema);