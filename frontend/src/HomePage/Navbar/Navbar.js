import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
      <div className="navbox">
        <div className="text-wrapper">MYUSIK</div>
        <Link to="/user">
          <img className="acc-img" src="./user.png" alt="Account" />
        </Link>
      </div>
    );
  };
  

