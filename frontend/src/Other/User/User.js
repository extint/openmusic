import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
import { Recent } from "../../HomePage/Recent/Recent";
import { MainHome } from "../../HomePage/MainHome/mainplaylists";
import { Sidebar } from "../../HomePage/Sidebar/Sidebar";
import { Navbar } from "../../HomePage/Navbar/Navbar";
import  Player  from "../../HomePage/Player/player";
// import { Profile } from "./Profile/Profile";
import { useEffect,useState } from "react";
import text from "../../HomePage/text.json"
export const User = (props) => {
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

    return (
        <div className="AuserPage">
        <div className="Ablur"/>
        <Navbar />
        {/* <Profile /> */}
        <Sidebar />
        <Player />
            {/* <div className="top-artists-this-month">top artists this month:</div> */}
        {/* <div className="text-wrapper-2">recently played:</div>   */}
            {/* <div className="user-home"> */}
        <div className="Atop-artists-this-month">Top artists this month:
        <div className="Atop-artists">
          {props.followedArtists.map((item, index) => (
            <Link to='/artist'>
            <div
              className="Aartist-board"
              key={index} >
              <img className="Aartist-photo" alt="Model" src={item.images[0].url} />
              <div className="Aartist">{item.artists[0].name}</div>
            </div>
            </Link>
          ))}
        </div> </div>

        {/* <div className="top-songs-this-month">Top songs this month:
        <div className="top-songs">
          {props.topSongs.map((item, index) => (
            <Link to='/topsongs'>
            <div
              className="artist-board"
              key={index} >
              <img className="model" alt="Model" src={item.images[0].url} />
              <div className="artist">{item.name}</div>
              <div className="song">{item.artists[0].name}</div>
            </div>
            </Link>
          ))}
        </div> </div> */}
        <div className="Atop-songs-this-month">
        <div className="Atop-songs-heading">Top songs this month:</div>
        <div className="Atop-songs-container">
          {props.topSongs.map((item, index) => (
            <Link to='/topsongs' key={index}>
              <div className="Aartist-board"
                key={index}>
                <img className="Amodel" alt="Model" src={item.images[0].url} />
                <div className="Aartist">{item.name}</div>
                <div className="Asong">{item.artists[0].name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
        
        <div className="Aplaylists">
        <div className="Aplaylist-boards-heading">Your Playlists:</div>
        <div className="Aplaylist-boards">
        {props.suggestedSongs.map((item, index) => (
            <Link to="/playlists">
            <div
            className="Aartist-board"
            key={index} >
            <img className="Amodel" alt="Model" src="model.png" />
            <div className="Asong">{item.artistName}</div>
            <div className="Aartist">{item.songName}</div>
            </div>
            </Link>
      ))}
    </div></div>
    {/* </div> */}
    {/* <div className="text-wrapper">TOP artists this month:</div>*/}
    {/* </div> */}
    </div>

  );
};
