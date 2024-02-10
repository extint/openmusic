import React from "react";
import "./Profile.css";
import { useEffect,useState } from "react";

export const Profile = () => {

  return (
    <div className="PProfile">
        
          <div className="Pphoto-bg">
            <img className="Pphoto" alt="PPhoto" src="https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.shadowsphotography.co%2Fdiscover-photography-the-art-of-the-image%2F&psig=AOvVaw0tuEJSQFPtU7tzA7MCNtJH&ust=1707630531171000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLCn2cyJoIQDFQAAAAAdAAAAABAH"/>
          </div>
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
