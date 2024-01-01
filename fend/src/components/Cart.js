import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Gc from "./Gc";

let Cart = () => {
  let [data, setData] = useState([]);
  let [err, setErr] = useState("");
  let [total, setTotal] = useState(0);
  let obj = useContext(Gc);
  let getcart = () => {
    axios
      .get(`http://localhost:5000/getcart/${obj.usercon._id}`, {
        headers: { Authorization: obj.usercon.token },
      })
      .then((res) => {
        if (res.data.msg == undefined) {
          setData(res.data);
          let y = res.data;
          let x = 0;
          for (let i = 0; i < y.length; i++) {
            x = x + y[i].qty * y[i].price;
          }
          setTotal(x);
        } else {
          setErr(res.data.msg);
        }
      });
  };
  useEffect(() => {
    if (obj.usercon._id == "") {
      setErr("plz login");
    } else {
      getcart();
    }
  }, []);
  let del = (_id) => {
    axios
      .delete(`http://localhost:5000/delitem/${_id}`, {
        headers: { Authorization: obj.usercon.token },
      })
      .then((res) => {
        getcart();
      });
  };
  let inc = (id) => {
    axios
      .put(
        `http://localhost:5000/inc`,
        { _id: id },
        { headers: { Authorization: obj.usercon.token } }
      )
      .then((res) => {
        getcart();
      });
  };
  let dec = (id) => {
    axios
      .put(
        `http://localhost:5000/dec`,
        { _id: id },
        { headers: { Authorization: obj.usercon.token } }
      )
      .then((res) => {
        getcart();
      });
  };
  let clercart = () => {
    axios
      .delete(`http://localhost:5000/delcart/${obj.usercon._id}`, {
        headers: { Authorization: obj.usercon.token },
      })
      .then((res) => {
        getcart();
      });
  };
  let subcart=()=>{
    alert("Please try later")
  }

  return (
    <div className="w-full h-full bg-slate-200">
      {err != "" && <div>{err}</div>}
      {err == "" && data.length == 0 && <div>Your cart is empty</div>}
      {data.length != 0 && (
        <div className="prodcon flex w-4/5 flex-wrap mx-auto pl-64 gap-5 pt-8">
          {data.map((item, index) => {
            return (
              <div className="card flex justify-between w-3/5 h-56 bg-white p-5">
                <div className="img w-3/12 h-full">
                  <img
                    className="w-full h-full"
                    src={`http://localhost:5000/imgs/${item.img}`}
                  />
                </div>
                <div className="w-8/12 h-full flex flex-col justify-end gap-2">
                  <h1>${item.price.toFixed(2)}</h1>
                  <h1>{item.name}</h1>
                  <h1>
                    <span>qty: </span>
                    <button className="border px-2 rounded-full bg-slate-400"
                      onClick={() => (item.qty > 1 ? dec(item._id) : null)}>-</button>
                    <span> {item.qty} </span>
                    <button className="border px-1.5 rounded-full bg-slate-400" onClick={() => inc(item._id)}>+</button>
                  </h1>
                  <h1>Total Amount: ${(item.price * item.qty).toFixed(2)}</h1>
                  <button
                    className="border bg-rose-300 w-full"
                    onClick={() => del(item._id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex w-full h-12 pt-4 justify-center">
        {data.length != 0 && (
          <div className="text-red-500">Total: ${total.toFixed(2)}</div>
        )}
      </div>
      <div>
        {data.length != 0 && (
          <div className="flex w-full mb-4 justify-center gap-4">
          <button className="border bg-yellow-400 px-3" onClick={clercart}>
            Empty Cart
          </button>
          <button className="border bg-green-500 px-3" onClick={subcart}>
            Proceed to payment
          </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
