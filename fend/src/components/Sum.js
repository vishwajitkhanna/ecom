import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Gc from "./Gc";

const Sum = () => {
  let obj = useContext(Gc);
  let [data,setData]=useState([])
  let [xt,setXt]=useState(0)
  let [total,setTotal]=useState(0)

    let getcart = () => {
      axios
        .get(`http://localhost:5000/getcart/${obj.usercon._id}`, {
          headers: { Authorization: obj.usercon.token },
        })
        .then((res) => {
          if (res.data.msg == undefined) {
            setData(res.data);
            let y = res.data;
            setXt(y.length)
            obj.usercon.cartlength = xt;
            let x = 0;
          for (let i = 0; i < y.length; i++) {
            x = x + y[i].qty * y[i].price;
          }
          setTotal(x);
          }
        });
    };
    useEffect(()=>{
      if (obj.usercon._id != ""){
      getcart()
      }
      else{
        setXt(0)
        setTotal(0)
      }
    },[getcart])
  
  return (
    <div className="z-50 w-14 h-14 bg-teal-600 fixed right-5 top-1/3 p-1 text-xs font-bold flex flex-col justify-around items-center">
      <div><span className="text-red-800">{xt} </span>Item</div>
      <div><button className="text-red-800 bg-white py-0.5 px-1">${total.toFixed(2)}</button></div>
    </div>
  );
};

export default Sum;
