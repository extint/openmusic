import React from "react";
import "./Profile.css";
import { useEffect,useState } from "react";

export const Profile = () => {

  return (
    <div className="Profile">     
          <div className="photo-bg">
            <img className="photo" alt="Photo" src="model1.png" />
          </div>
          <div className="text-content">
            <div className="user">user</div>
            <div className="username">Labhansh</div>
          <div className="profile-playlists">4 public playlists</div>
          <div className="followers">42 followers</div>
          <div className="following">0 following</div>
          </div>
        
      </div>
  );
};
