import axios from "axios";
import React, { useContext, useState } from "react";
import Gc from "./Gc";

const Addprod = () => {
  let [data, setData] = useState({});
  let obj = useContext(Gc);
  let [err, setErr] = useState("");
  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let fun1 = (e) => {
    setData({ ...data, img: e.target.files[0] });
  };
  let addprod = (e) => {
    let d = new FormData();
    for (let p in data) {
      d.append(p, data[p]);
    }

    axios
      .post("http://localhost:5000/addprod", d, {
        headers: { Authorization: obj.usercon.token, _id: obj.usercon._id },
      })
      .then((res) => {
        setErr(res.data.msg);
      });
  };
  return (
    <div className="regcon">
      <div className="reg">
        <div style={{ color: "blue" }}>{err}</div>
        <input
          type="text"
          placeholder="enter prod name"
          name="name"
          onChange={fun}
        />
        <input
          type="text"
          placeholder="enter price"
          name="price"
          onChange={fun}
        />
        <input
          type="text"
          placeholder="enter old price"
          name="oldprice"
          onChange={fun}
        />
        <input type="file" name="img" onChange={fun1} />
        <button onClick={addprod}>Addprod</button>
      </div>
    </div>
  );
};

export default Addprod;
