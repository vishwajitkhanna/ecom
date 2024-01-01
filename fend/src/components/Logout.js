import { useContext, useEffect } from "react"
import Gc from "./Gc"
import { useNavigate } from "react-router-dom"

let Logout=()=>{
    let obj=useContext(Gc)
    let navigate=useNavigate()
    useEffect(()=>{
        obj.updateusercon({"token":"","name":"","islogin":false,"isadmin":false,"_id":""})
        navigate("/")
    },[])
    return(<></>)
}
export default Logout