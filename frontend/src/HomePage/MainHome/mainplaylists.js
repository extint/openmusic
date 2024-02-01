import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./mainplaylists.css";
export const MainHome = (props) => {
  const name=useParams().userName
  return (
    <div className="main-home">
      <div className="text-wrapper">WELCOME {name} !</div>
      <div className="text-wrapper-2">recently played:</div>
      <div className="suggested-boards">
          {props.likedSongs.map((item, index) => (
            <div
              className="song-board"
              key={index} >
            <Link to='/topsongs'>
              <img className="model" alt="Model" src={item.images[0].url} />
            </Link>
              <div className="song">{item.name}</div>
              <div className="song-2">{item.artists[0].name}</div>
            </div>
          ))}
        </div>
        <div className="playlist-boards">
          {props.recommendedSongs.map((item, index) => (
            <div
              className="playlist-board"
              key={index} >
          <Link to="/playlist">
              <img className="model" alt="Model" src={item.images[0].url }/>
          </Link>
              <div className="song">{item.name}</div>
              <div className="song-2">{item.artists[0].name}</div>
            </div>
          ))}
        </div>
    </div>
  );
};