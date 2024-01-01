import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./reg.css";
import Gc from "./Gc";

const Login = () => {
  let navigate = useNavigate();
  let [data, setData] = useState({ _id: "", password: "" });
  let [err, setErr] = useState("");
  let obj = useContext(Gc);
  useEffect(() => {
    let x = localStorage.getItem("data");
    if (x != undefined) {
      setData(JSON.parse(x));
    }
  }, []);
  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let login = () => {
    localStorage.setItem("data", JSON.stringify(data));
    axios.post("http://localhost:5000/login", data).then((res) => {
      if (res.data.token != undefined) {
        let y = {
          islogin: true,
          token: res.data.token,
          _id: res.data._id,
          name: res.data.name,
        };
        if (res.data.role == 101) {
          y.isadmin = true;
        } else {
          y.isadmin = false;
        }
        obj.updateusercon(y);

        navigate("/");
      } else {
        setErr(res.data.msg);
      }
    });
  };
  return (
    <div className="regcon">
      <div className="reg">
        <div style={{ color: "red" }}>{err}</div>
        <input
          type="text"
          placeholder="enter email"
          name="_id"
          onChange={fun}
          value={data._id}
        />
        <input
          type="password"
          placeholder="enter password"
          name="password"
          onChange={fun}
          value={data.password}
        />
        <button onClick={login}>Login</button>
                <div className="new-sign flex flex-col items-center">
                  <p>New Customer?</p>
                  <p style={{ color: "blue" }}>
                    <Link to="/reg">Signup</Link>
                  </p>
                </div>
      </div>
      
    </div>
  );
};

export default Login;
