import "./Profile.css";
import React, { useRef, useEffect, useState } from "react";
import { Link,useLocation,useParams } from "react-router-dom";
import axios from "axios";
import { accessToken } from "../../../accessToken";

export const Profile = () => {
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

  return (
    <div className="PProfile">
   {artistInfo.topTracks.map((item, index) => (
  <div className="Pphoto-bg" key={index}>
    <img className="Pphoto" alt="Model" src={item.images[0].url} />
  </div>
))}

          <div className="Ptext-content">
            <div className="Puser">artist</div>
            {/* <div className="Pusername">Labhansh</div> */}
          {artistInfo.topTracks.map((item, index) => (
            <div className="" >
            <div className="Pusername">{artistInfo.topTracks[0].artists[0].name}</div>
          </div>
        ))}
          <div className="Pprofile-playlists">{Math.floor(Math.random() * 100) + 1}M listeners</div>
          {/* <div className="Pfollowers">61M listeners</div> */}
          </div>

      </div>
  );
};