import React from "react";
import "./mainplaylists.css";
import { useState,useEffect } from "react";
export const MainHome = (props) => {

return (

          <div className="main-home">
            <div className="text-wrapper">WELCOME {props.name} !</div>
            <div className="text-wrapper-2">recently played:</div>
            <div className="playlist-boards">
              {props.container.map((item, index) => (
                <div className="playlist-board" key={index}>
                  <img className="model" alt="Model" src="model.png" />
                  <div className="song">{item.artistName}</div>
                  <div className="song-2">{item.songName}</div>
                </div>
              ))}
            </div>
          </div>

            // <div className="main-home">
            //         <div className="text-wrapper">WELCOME {props.name} !</div>
            //         <div className="text-wrapper-2">recently played:</div>
            //         <div className="playlist-boards">
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
            //             <div className="playlist-board">
            //                 <img className="model" alt="Model" src="model.png" />
            //                 <div className="song" />
            //                 <div className="song-2" />
            //             </div>
                        
            //         </div>
            // </div>
    );
};