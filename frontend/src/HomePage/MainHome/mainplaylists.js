import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./mainplaylists.css";
export const MainHome = (props) => {

  return (
    <div className="main-home">
      <div className="text-wrapper">WELCOME {props.name} !</div>
      <div className="text-wrapper-2">recently played:</div>
      <div className="suggested-boards">
          {props.likedSongs.map((item, index) => (
            <Link to='/topsongs'>
            <div
              className="song-board"
              key={index} >
              <img className="model" alt="Model" src={item.images[0].url} />
              <div className="song">{item.name}</div>
              <div className="song-2">{item.artists[0].name}</div>
            </div>
            </Link>
          ))}
        </div>
        <div className="playlist-boards">
          {props.suggestedSongs.map((item, index) => (
      <Link to="/user">
            <div
              className="playlist-board"
              key={index} >
              <img className="model" alt="Model" src="model.png" />
              <div className="song">{item.artistName}</div>
              <div className="song-2">{item.songName}</div>
            </div>
          </Link>
          ))}
        </div>
    </div>
  );
};