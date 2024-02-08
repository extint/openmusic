import React from "react";
import "./Navbar.css";
import {Link,useNavigate ,useParams} from "react-router-dom";

export const Navbar = (props) => {
  const params=useParams()
  const navigate=useNavigate()
    return (
      <div className="navbox">
        <div className="text-wrapper">MYUSIK</div>
        {/* <Link to="/user"> */}
          <div className="acc-img"  onClick={()=>{navigate(`/profile/${params.userName}` ,{replace:true,state:props})}}/>
        {/* </Link> */}
      </div>
    );
  };
  

