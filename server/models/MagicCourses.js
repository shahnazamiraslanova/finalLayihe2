const mongoose=require('mongoose');
 const MagicCoursesSchema=mongoose.Schema({
    img:String,
    title:String,
    price:Number,
    description:String,

 });

 

 module.exports=mongoose.model("courses",MagicCoursesSchema);