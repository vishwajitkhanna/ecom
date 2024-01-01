let multer=require("multer")
const { v4: uuidv4 } = require('uuid');
const prodmodel = require("../models/prodmodel");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })

let addprod=(req,res)=>{
    let data={"_id":uuidv4(),...req.body,"img":req.file.filename}
    new prodmodel(data).save().then(()=>{
        res.json({"msg":"added"})
    }).catch((err)=>{
        console.log(err)
    })

}
let getprod=async(req,res)=>{
  let data=await prodmodel.find( )
  res.json(data)

}
let updateprod=async(req,res)=>{
 await prodmodel.updateOne({"_id":req.body._id},req.body)
 res.json({"msg":"updated"})

}
let delprod=async(req,res)=>{
  await prodmodel.deleteOne({"_id":req.params._id})
  res.json({"msg":"deleted"})
}
let addcom=async(req,res)=>{
  await prodmodel.updateOne({"_id":req.body._id},{$push:{"comm":req.body.comm}})
  res.json({"msg":"ok"})
}
module.exports={addprod,upload,getprod,updateprod,delprod,addcom}