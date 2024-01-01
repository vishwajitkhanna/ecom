let user=require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let fs=require('fs')
let userreg=async(req,res)=>{
    let result=await user.findById({"_id":req.body._id})
    if(result==null)
    {
        let hashcode=await bcrypt.hash(req.body.password,10)
        let data={...req.body,"password":hashcode}
        new user(data).save().then(()=>{
            res.json({"msg":"acc created"})
        }).catch((err)=>{
            console.log(err)
        })
    }
    else{
        res.json({"msg":"email exist"})
    }
}

let login=async(req,res)=>{
    let result=await user.findById({"_id":req.body._id})
    if(result==null)
    {
        res.json({"msg":"check email"})
    }
    else{
        let f=await bcrypt.compare(req.body.password,result.password)
        if(f)
        {
            res.json({
                "token":jwt.sign({"uid":req.body._id},"fsd5"),
                "_id":result._id,
                "role":result.role,
                "name":result.name
            })
        }
        else{
            res.json({"msg":"check password"})
        }
    }

}
let islogin=(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"fsd5")
        next()
    }
    catch(err)
    {
        if(req.url=='/addprod')
        {
         
                fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
           
        }
        res.json({"msg":"plz login"})
    }
}
let isauth=async(req,res,next)=>{
    let result=await user.findById({"_id":req.headers._id})
    if(result.role==101)
    {
        next()
    }
    else{
        if(req.url=='/addprod')
        {
         
                fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
           
        }
        res.json({"msg":"you canot access"})
    }
}
module.exports={userreg,login,islogin,isauth}