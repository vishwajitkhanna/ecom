import axios from "axios";
import { useContext, useState } from "react";
import Gc from "./Gc";
import { useNavigate } from "react-router-dom";

const Desc = () => {
  let navigate = useNavigate();
  let obj = useContext(Gc);
  let item = obj.usercon.oneitem;
  let [data, setData] = useState([]);
  let addcart = (item) => {
    if (obj.usercon.islogin) {
      item = { ...item };
      let pid = item._id;
      delete item._id;
      delete item.comm;
      data = { pid: pid, uid: obj.usercon._id, ...item };
      axios
        .post("http://localhost:5000/addcart", data, {
          headers: { Authorization: obj.usercon.token },
        })
        .then((res) => {});
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-full h-full bg-white">
      <div className="card flex justify-between w-full h-full bg-red-200 p-5">
        <div className="img w-3/12 h-full">
          <img
            className="w-full h-full"
            src={`http://localhost:5000/imgs/${item.img}`}
          />
        </div>
        <div className="w-8/12 h-full flex flex-col gap-6">
          <h1>${item.price.toFixed(2)}</h1>
          <h1>{item.name}</h1>
          <button className="border bg-rose-300" onClick={() => addcart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Desc;
