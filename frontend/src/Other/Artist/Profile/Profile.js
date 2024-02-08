import React from "react";
import "./Profile.css";
import { useEffect,useState } from "react";

export const Profile = () => {

  return (
    <div className="PProfile">
          <div className="Pphoto-bg">
            <img className="Pphoto" alt="Photo" src="model1.png" />
          </div>
          <div className="Ptext-content">
            <div className="Puser">user</div>
            <div className="Pusername">Labhansh</div>
          <div className="Pprofile-playlists">4 public playlists</div>
          <div className="Pfollowers">42 followers</div>
          <div className="Pfollowing">0 following</div>
          </div>

      </div>
  );
};