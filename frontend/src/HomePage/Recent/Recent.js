import React, { useEffect,useState } from "react";
import "./Recent.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { accessToken } from "../../accessToken";

export const Recent = (props) => {
  const myToken = accessToken
  const [selectedSongId, setSelectedSongId] = useState(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.blur');
      if (cursor) {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  //spotify api
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
    <div className="recent-tab">
      <div className="blur"/>
      <div className="inner-recent-box">
        {props.recentSongs.map((item, index) => (
          <div className="overlap">
              <button className="Play" onClick={() => handleClick(item.songId)} data-song-id={item.songId} />
              <Link to="/song" key={index}>
              <img className="recentModel" alt="Model" data-song-id={item.songId} src={item.images[0].url} />
              </Link>
              <div className="recent-text-wrapper">{item.name}</div>
            </div>
        ))}
      </div>
    </div>
  );
};