const mongoose=require('mongoose');
 const MagicContactSchema=mongoose.Schema({
    name:String,
    lastName:String,
    email:String,
    phone:String,
    message:String

 });

 

 module.exports=mongoose.model("contacts",MagicContactSchema);