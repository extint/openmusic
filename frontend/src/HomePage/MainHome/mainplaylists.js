import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./mainplaylists.css";
import axios from "axios";

export const MainHome = (props) => {
  const myToken = 'BQClwiPvzHTQE0RdnQfOxteveNKaI4jhjI0GsBSNG2smV2fLvS7K_7eE3cQu3MRjxdLtghy268BX3YsUweZXLUkKrh-OUdevebqE9s8tZ8fjlhDkgJigHmyNaeeUxBIiJP04ytY5OXVfYvvwUu1Agp4H6twysfuOrbpwR-ZWl2UMGOENUPW9_c-lW2Wc2Iu_vB-wMjP3TcZex1HKQR407Kyy_xUb';
  const name = useParams().userName;
  const modelsRef = useRef([]);

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
      const songId = e
      console.log(songId,"vedant");
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
          <div className="song-board" key={index}>
            <button className="songPlay" onClick={() => handleClick(item.songId)}/>
            <img className="model" alt="Model" data-song-id={item.songId} src={item.images[0].url} />
            <div className="song">{item.name}</div>
            <div className="song-2">{item.artists[0].name}</div>
          </div>
        ))}
      </div>
      <div className="playlist-boards">
        {props.recommendedSongs.map((item, index) => (
          <div className="playlist-board" key={index}>
            <button className="songPlay" onClick={() => handleClick(item.songId)}/>
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
