let cart=require("../models/cartmodel")
const { v4: uuidv4 } = require('uuid');
let addcart=async(req,res)=>{
    let data=await cart.find({"uid":req.body.uid,"pid":req.body.pid})
    if(data.length==0)
    {
        new cart({"_id":uuidv4(),...req.body}).save().then(()=>{
            res.json({"msg":"prod added"})
        }).catch((err)=>{
            console.log(err)
        })
    }
    else
    {
        await cart.findByIdAndUpdate({"_id":data[0]._id},{$inc:{"qty":1}})
        res.json({"msg":"incremented"})
    
    }

}

let getcart=async(req,res)=>{
    let data=await cart.find({"uid":req.params.uid})
    res.json(data)
}
let delcart=async(req,res)=>{
    await cart.deleteMany({"uid":req.params.uid})
    res.json({"msg":"cart deleted"})

}
let delitem=async(req,res)=>{
    await cart.findByIdAndDelete({"_id":req.params._id})
    res.json({"msg":"item deleted from cart"})
}
let incqty=async(req,res)=>{
    await cart.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
    res.json({"msg":"incremented"})
}
let decqty=async(req,res)=>{
    await cart.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":-1}})
    res.json({"msg":"decremented"})
}
module.exports={addcart,getcart,delitem,delcart,incqty,decqty}