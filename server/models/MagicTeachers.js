const mongoose=require('mongoose');
 const MagicTeachersSachema=mongoose.Schema({
    img:String,
    name:String,
    subject:String,
    experience:Number,
    description:String,

 });

 

 module.exports=mongoose.model("teachers",MagicTeachersSachema);