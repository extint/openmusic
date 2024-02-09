import React, { useRef, useEffect, useState } from "react";
import { Link,useLocation,useParams } from "react-router-dom";
import "./Artist.css";
import { Recent } from "../../HomePage/Recent/Recent";
import { MainHome } from "../../HomePage/MainHome/mainplaylists";
import { Sidebar } from "../../HomePage/Sidebar/Sidebar";
import { Navbar } from "../../HomePage/Navbar/Navbar";
import Player from "../../HomePage/Player/player";
import { Profile } from "./Profile/Profile";
import text from "../../HomePage/text.json";
import axios from "axios";
import { accessToken } from "../../accessToken";

export const Artist = (props) => {
  const location = useLocation();
  const state = location.state; // Access the state object directly
  console.log(state.artistId, "hehe");
  const myToken = accessToken
  const name = useParams().userName;
  const modelsRef = useRef([]);
  // const [selectedSongId, setSelectedSongId] = useState(null);
  const [artistInfo,setArtistInfo]=useState({
    topTracks:[],
    relatedArtists:[]
  }
  )
  const getArtist=async()=>{
    try{
      const fetchA = await axios.get("http://localhost:8000/artist", {
                    params: {
                        artistId: state.artistId
                    },
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                setArtistInfo(fetchA.data)
                console.log(fetchA.data,"its ok warren, its her not u");

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getArtist()
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
      // setSelectedSongId(songId === selectedSongId ? null : songId); // Toggle the selected songId
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

    useEffect(() => {
        const handleMouseMove = (e) => {
          const cursor = document.querySelector('.Ablur');
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
          <Navbar/>
          <Player />
          <Profile {...state}/>
          <Sidebar {...state}/>
        
        <div className="Atop-songs-artist">
        <div className="Atop-songs-heading">Top songs:</div>
        <div className="Atop-songs-container">
          {artistInfo.topTracks.map((item, index) => (
          <div className="Asong-board" key={index}>
            <button className="songPlay" onClick={() => handleClick(item.songId)} data-song-id={item.songId} />
            <img className="model" alt="Model" data-song-id={item.songId} src={item.images[0].url} />
            <div className="Asong">{item.name}</div>
            <div className="Asong-2">{item.artists[0].name}</div>
          </div>
        ))}
        </div>
      </div>
        
        <div className="Aplaylists-artist">
        <div className="Aplaylist-boards-heading">Recent Albums:</div>
        <div className="Aplaylist-boards">
        {artistInfo.relatedArtists.map((item, index) => (
          <div className="Aplaylist-board " key={index}>
            {/* <button className="AsongPlay" onClick={() => handleClick(item.songId)} data-song-id={item.songId} /> */}
            <Link to="/playlist">
              <img className="Amodel" alt="Model" src={item.images[0].url} />
            </Link>
            <div className="Asong">{item.name}</div>
            {/* <div className="Asong-2">{item.artists[0].name}</div> */}
          </div>
        ))}
    </div></div>
        </div>
            

  );
};
