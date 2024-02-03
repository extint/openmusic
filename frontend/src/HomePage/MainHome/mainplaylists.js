import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./mainplaylists.css";
import axios from "axios";
import { accessToken } from "../../accessToken";

export const MainHome = (props) => {
  const myToken = accessToken
  const name = useParams().userName;
  const modelsRef = useRef([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    modelsRef.current.forEach((model) => {
      model.addEventListener('click', handleClick);
    });
    return () => {
      modelsRef.current.forEach((model) => {
        model.removeEventListener('click', handleClick);
      });
    };
  }, []);

  async function handleClick(e) {
  
    try {
      console.log(e,"here")
      const songId = e 
      setSelectedSongId(songId === selectedSongId ? null : songId); // Toggle the selected songId
      // setPlay(songId); // Set the currently playing item
      await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A${songId}`, {}, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${myToken} `
        }
      });
      await axios.post("https://api.spotify.com/v1/me/player/next", {}, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="main-home">
      <div className="text-wrapper">WELCOME {name} !</div>
      <div className="text-wrapper-2">recently played:</div>
      <div className="suggested-boards">
        {props.likedSongs.map((item, index) => (
          <div className={` ${selectedSongId === item.songId ? 'selected' : 'song-board'}`} key={index}>
            <button className="songPlay" onClick={() => handleClick(item.songId)} data-song-id={item.songId} />
            <img className="model" alt="Model" data-song-id={item.songId} src={item.images[0].url} />
            <div className="song">{item.name}</div>
            <div className="song-2">{item.artists[0].name}</div>
          </div>
        ))}
      </div>
      <div className="playlist-boards">
        {props.recommendedSongs.map((item, index) => (
          <div className={`playlist-board ${selectedSongId === item.songId ? 'selected' : ''}`} key={index}>
            <button className="songPlay" onClick={() => handleClick(item.songId)} data-song-id={item.songId} />
            <Link to="/playlist">
              <img className="model" alt="Model" src={item.images[0].url} />
            </Link>
            <div className="song">{item.name}</div>
            <div className="song-2">{item.artists[0].name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};