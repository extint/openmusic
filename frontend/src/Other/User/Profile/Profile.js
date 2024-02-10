import React from "react";
import "./Profile.css";
import { useEffect,useState } from "react";

export const Profile = () => {

  return (
    <div className="PProfile">
        
          <div className="Pphoto-bg">
            <div className="Pphoto">
            <img className="search" alt="" src="./mode.png"/>
          </div></div>
          <div className="Ptext-content">
            <div className="Puser">user</div>
            <div className="Pusername">WarrenJ</div>
          <div className="Pprofile-playlists">6 public playlists</div>
          <div className="Pfollowers">4 followers</div>
          <div className="Pfollowing">2 following</div>
          </div>
        
      </div>
  );
};
