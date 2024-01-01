import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./nav.css";
import Gc from "./Gc";
import logo from "../logo/logo.png";

const Nav = () => {
  let obj = useContext(Gc);
  


  return (
    <nav className="nav w-full h-8 items-center fixed flex justify-between px-5 bg-gray-900 text-white">
      <Link to="/">
        <div className="logo w-10 h-5/6">
          <img className="w-full h-full" src={logo} />
        </div>
      </Link>
      <div className="flex gap-10">
        {!obj.usercon.islogin && (
          <Link to="/login">
            <div className="nav-login group">
              Login
            </div>
          </Link>
        )}

        <Link to="/cart">Cart</Link>
        {obj.usercon.islogin && obj.usercon.isadmin && (
          <Link to="/add">Addprod</Link>
        )}
        {obj.usercon.islogin && <Link to="/logout">Logout</Link>}
        {obj.usercon.islogin && <div>{obj.usercon.name}</div>}
      </div>
    </nav>
  );
};

export default Nav;
