import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './reg.css'

const Reg = () => {
    let [data,setData]=useState({})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let register=()=>{
        axios.post("http://localhost:5000/reg",data).then((res)=>{
            if(res.data.msg=='acc created')
            {
                navigate("/login")
            }
            else{
                setErr(res.data.msg)
            }
        })
    }
  return (
    <div className='regcon'>
    <div className='reg'>
        <div style={{"color":"red"}}>{err}</div>
        <input type='text' placeholder='enter email' name="_id" onChange={fun}/>
        <input type='text' placeholder='enter name' name="name" onChange={fun}/>
        <input type='date' name="dob" onChange={fun}/>
        <div><input type='radio' name="gen" value="male" onChange={fun}/>Male
        <input type='radio' name="gen" value="female" onChange={fun}/>Female
        </div>
        <input type='text' name="phno" placeholder='enter phno' onChange={fun}/>
        <input type='password' name='password' placeholder='enter password' onChange={fun}/>
        <button onClick={register}>Register</button>
    </div>
    </div>
  )
}

export default Reg