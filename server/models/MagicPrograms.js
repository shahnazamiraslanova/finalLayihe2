const mongoose=require('mongoose');
 const MagicProgramSchema=mongoose.Schema({
    img:String,
    title:String,
    description:String,

 });

 

 module.exports=mongoose.model("programs",MagicProgramSchema);