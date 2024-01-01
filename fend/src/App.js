import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Reg from "./components/Reg";
import Cart from "./components/Cart";
import Addprod from "./components/Addprod";
import Gc from "./components/Gc";
import Updprod from "./components/Updprod";
import Logout from "./components/Logout";
import Desc from "./components/Desc";
import Sum from "./components/Sum";

const App = () => {
  let [usercon, setUsercon] = useState({
    token: "",
    name: "",
    islogin: false,
    isadmin: false,
    _id: "",
  });
  let updateusercon = (obj) => {
    setUsercon({ ...usercon, ...obj });
  };
  let obj = { usercon: usercon, updateusercon: updateusercon };
  return (
    <BrowserRouter>
      <Gc.Provider value={obj}>
        <Nav />
        <div className="flex pt-7 bg-slate-200">
          <Sum />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/desc" element={<Desc />} />
            <Route path="/add" element={<Addprod />} />
            <Route path="/update" element={<Updprod />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Gc.Provider>
    </BrowserRouter>
  );
};

export default App;
