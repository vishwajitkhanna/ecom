import React, { useContext, useEffect, useState } from 'react'
import Gc from './Gc'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Updprod = () => {
  let [data,setData]=useState({})
  let navigate=useNavigate()
  let obj=useContext(Gc)
  useEffect(()=>{
    console.log(obj.usercon.item)
    let x={...obj.usercon.item}
    delete x.comm
    delete x.img
    setData(x)

  },[])
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let upd=()=>{
    axios.put("http://localhost:5000/updateprod",data,{headers:{"Authorization":obj.usercon.token,"_id":obj.usercon._id}}).then(()=>{
      navigate("/")
    })
  }
  return (
    <div>
      <input type='text' value={data.name} onChange={fun} name="name"/>
      <input type='text' value={data.price} onChange={fun} name="price"/>
      <input type='text' value={data.desc} onChange={fun} name="desc"/>
      <input type='text' value={data.cat} onChange={fun} name="cat"/>
      <button onClick={upd}>update</button>

    </div>
  )
}

export default Updprod