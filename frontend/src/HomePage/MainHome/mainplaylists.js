// import React from "react";
// import "./mainplaylists.css";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export const MainHome = (props) => {
//   return (

//     <div className="main-home">
//       <div className="text-wrapper">WELCOME {props.name} !</div>
//       <div className="text-wrapper-2">recently played:</div>
//       <Link to="/user">
//         <div className="playlist-boards">
//           {props.container.map((item, index) => (
//             <div className="playlist-board" key={index}>
//               <img className="model" alt="Model" src="model.png" />
//               <div className="song">{item.artistName}</div>
//               <div className="song-2">{item.songName}</div>
//             </div>
//           ))}
//         </div>
//       </Link>
//     </div>
//   );
// };
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./mainplaylists.css";

export const MainHome = (props) => {

  return (
    <div className="main-home">
      <div className="text-wrapper">WELCOME {props.name} !</div>
      <div className="text-wrapper-2">recently played:</div>
      <Link to="/user">
        <div className="playlist-boards">
          {props.container.map((item, index) => (
            <div
              className="playlist-board"
              key={index} >
              <img className="model" alt="Model" src="model.png" />
              <div className="song">{item.artistName}</div>
              <div className="song-2">{item.songName}</div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};
