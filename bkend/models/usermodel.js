let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "dob":Date,
    "phno":Number,
    "gen":String,
    "password":{
        "type":String,
        "required":true},
    "role":{
        "type":Number,
        "default":102
    }


})

module.exports=mongoose.model("user",usersch)