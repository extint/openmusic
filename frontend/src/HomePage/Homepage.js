import React from "react";
import "./HomePage.css";
import { Recent } from "./Recent/Recent";
import { MainHome } from "./MainHome/mainplaylists";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";
import { Player } from "./Player/player";
import { useEffect,useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

// const parameter = { name: 'John', age: 25 };
export const Homepage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userName, setUserName] = useState({
    userName:''
  })
  
  const params = useParams();
  console.log("params", params);
  useEffect(() => {
    // Fetch user data from your Node.js backend
    const fetchData = async () => {
    try {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8000/user/verify",
        {},
        { withCredentials: true }
      );
      const { success, user } = data;
      if(!success){
        navigate('/login');
      }
      setUserName(user);
      console.log("user",user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
  };

  fetchData();
}, []);

const exampleArtists = {
  name: 'Vedant',
  container: [
    { artistName: 'Artist 1', songName: 'Song 1' },
    { artistName: 'Artist 2', songName: 'Song 2' },
    { artistName: 'Artist 3', songName: 'Song 3' },
    { artistName: 'Artist 4', songName: 'Song 2' },
    { artistName: 'Artist 5', songName: 'Song 3' },
    { artistName: 'Artist 6', songName: 'Song 2' },
    { artistName: 'Artist 7', songName: 'Song 3' },
    { artistName: 'Artist 8', songName: 'Song 2' },
    { artistName: 'Artist 9', songName: 'Song 3' },
    { artistName: 'Artist 10', songName: 'Song 2' },
    { artistName: 'Artist 11', songName: 'Song 3' },
    { artistName: 'Artist 12', songName: 'Song 2' },
    { artistName: 'Artist 13', songName: 'Song 3' },
    { artistName: 'Artist 14', songName: 'Song 2' },
    { artistName: 'Artist 15', songName: 'Song 3' },
    { artistName: 'Artist 16', songName: 'Song 2' },
    { artistName: 'Artist 16', songName: 'Song 3' },
    { artistName: 'Artist 17', songName: 'Song 2' },
    
    // Add more items as needed
  ],
};
const exampleRecent = {
  container: [
    { songName: 'Recent Song 1' },
    { songName: 'Recent Song 2' },
    { songName: 'Recent Song 3' },
    { songName: 'Recent Song 4' },
    { songName: 'Recent Song 5' },
    { songName: 'Recent Song 6' },
    { songName: 'Recent Song 7' },
    { songName: 'Recent Song 8' },
    // Add more items as needed
  ],
};


  return (
    <div className="homepage-container">
      <Recent{...exampleRecent} />
      <MainHome{...exampleArtists}/>
      <Player/>
      <Navbar />
      <Sidebar />
    </div>
    // <div className="desktop">
    //   <div className="div">
    //     <div className="overlap">
    //       <div className="overlap-group">
    //         <div className="overlap-group-2">
    //           <div className="topbar" />
    //           <div className="recents-tab" />
    //           <div className="main-home" />
    //           <div className="playlist-board" />
    //           <div className="playlist-board-2" />
    //           <div className="playlist-board-3" />
    //           <div className="playlist-board-4" />
    //           <img className="img" alt="Playlist board" src="playlist-board-4.svg" />
    //           <img className="model" alt="Model" src="model-1-15.png" />
    //           <div className="song-1" />
    //           <div className="song" />
    //           <img className="model" alt="Model" src="model-1-29.png" />
    //           <img className="song" alt="Song" src="song-5.svg" />
    //           <div className="song" />
    //           <img className="playlist-board-5" alt="Playlist board" src="playlist-board-2.svg" />
    //           <img className="model-2" alt="Model" src="model-1-31.png" />
    //           <img className="song" alt="Song" src="song-2.svg" />
    //           <div className="song" />
    //           <img className="model" alt="Model" src="model-1-33.png" />
    //           <img className="song" alt="Song" src="song-4.svg" />
    //           <div className="song" />
    //           <img className="playlist-board" alt="Playlist board" src="playlist-board-3.svg" />
    //           <img className="model" alt="Model" src="model-1-32.png" />
    //           <img className="song" alt="Song" src="song-3.svg" />
    //           <div className="song-8" />
    //           <img className="playlist-board-7" alt="Playlist board" src="image.svg" />
    //           <img className="model-5" alt="Model" src="model-1-30.png" />
    //           <img className="song-9" alt="Song" src="song.svg" />
    //           <div className="song-10" />
    //           <div className="recent-song" />
    //           <img className="library-and-search" alt="Library and search" src="library-and-search.svg" />
    //           <div className="side-song" />
    //           <div className="recent-song" />
    //           <div className="recent-song" />
    //           <img className="recent-song" alt="Recent song" src="recent-song.svg" />
    //           <div className="recent-song" />
    //           <div className="recent-song" />
    //           <div className="recent-song" />
    //           <div className="recent-song" />
    //           <div className="text-wrapper">WELCOME yathu !</div>
    //           <img className="yath-test" alt="Yath test" src="yath-test-1.png" />
    //           <div className="playlist-board-8" />
    //           <div className="song-11" />
    //           <div className="text-wrapper-2">made for you:</div>
    //           <div className="playlist-board-9" />
    //           <div className="playlist-board-10" />
    //           <div className="playlist-board-11" />
    //           <div className="text-wrapper-3">recently played:</div>
    //           <img className="account" alt="Account" src="account.png" />
    //           <img className="bell" alt="Bell" src="bell-1.png" />
    //           <img className="model-6" alt="Model" src="model-1-1.png" />
    //           <div className="text-wrapper-4">Liked Songs</div>
    //           <div className="text-wrapper-5">Daily Mix 1</div>
    //           <div className="text-wrapper-6">Podcasts</div>
    //           <div className="text-wrapper-7">Daily Mix 3</div>
    //           <div className="text-wrapper-8">My Playlist</div>
    //           <div className="laaabh-yatharth"> laaabh + yatharth</div>
    //           <div className="text-wrapper-9">Animal</div>
    //           <div className="text-wrapper-10">Project X</div>
    //           <div className="song-12" />
    //           <div className="song-13" />
    //           <img className="model-7" alt="Model" src="model-1-8.png" />
    //           <div className="song-14" />
    //           <div className="song-15" />
    //           <img className="model-8" alt="Model" src="model-1-9.png" />
    //           <div className="song-16" />
    //           <div className="song-13" />
    //           <img className="model-7" alt="Model" src="model-1-10.png" />
    //           <div className="song-14" />
    //           <div className="song-17" />
    //           <img className="model-9" alt="Model" src="model-1-11.png" />
    //           <div className="song-18" />
    //           <div className="playlist-board-12" />
    //           <img className="model-10" alt="Model" src="model-1-6.png" />
    //           <div className="song-19" />
    //           <div className="song-20" />
    //           <img className="model-11" alt="Model" src="model-1-12.png" />
    //           <img className="model-12" alt="Model" src="model-1-28.png" />
    //           <div className="song-21" />
    //           <div className="song-22" />
    //           <div className="song-23" />
    //           <div className="song-24" />
    //           <img className="model-13" alt="Model" src="model-1-14.png" />
    //           <div className="song-25" />
    //           <div className="song-26" />
    //           <img className="playlist-board-13" alt="Playlist board" src="playlist-board.svg" />
    //           <img className="model-14" alt="Model" src="model-1-7.png" />
    //           <div className="rectangle" />
    //           <div className="song-27" />
    //           <img className="playlist" alt="Playlist" src="playlist-1.png" />
    //           <img className="search" alt="Search" src="search.png" />
    //           <div className="text-wrapper-11">spotify (wannabe)</div>
    //         </div>
    //         <div className="model-wrapper">
    //           <img className="model-15" alt="Model" src="model-1-27.png" />
    //         </div>
    //         <div className="img-wrapper">
    //           <img className="model-15" alt="Model" src="model-1-26.png" />
    //         </div>
    //         <div className="overlap-2">
    //           <img className="model-16" alt="Model" src="model-1-25.png" />
    //         </div>
    //         <div className="overlap-3">
    //           <img className="model-17" alt="Model" src="model-1-24.png" />
    //         </div>
    //         <div className="overlap-4">
    //           <img className="model-15" alt="Model" src="model-1-21.png" />
    //         </div>
    //         <div className="overlap-5">
    //           <div className="side-song-2" />
    //           <img className="model-18" alt="Model" src="model-1-22.png" />
    //         </div>
    //         <div className="overlap-6">
    //           <img className="model-19" alt="Model" src="model-1-23.png" />
    //         </div>
    //         <div className="overlap-7">
    //           <img className="model-19" alt="Model" src="model-1-19.png" />
    //         </div>
    //         <div className="overlap-8">
    //           <img className="model-17" alt="Model" src="model-1-20.png" />
    //         </div>
    //         <div className="overlap-9">
    //           <img className="model-20" alt="Model" src="model-1-18.png" />
    //         </div>
    //         <div className="overlap-10">
    //           <img className="model-21" alt="Model" src="model-1-16.png" />
    //         </div>
    //         <div className="overlap-11">
    //           <img className="model-22" alt="Model" src="model-1-17.png" />
    //         </div>
    //         <div className="overlap-12">
    //           <img className="model-23" alt="Model" src="model-1-34.png" />
    //         </div>
    //       </div>
    //       {/* <div className="overlap-13">
    //         <div className="overlap-14">
    //           <img className="play-buttton" alt="Play buttton" src="play-buttton-1.png" />
    //           <img className="pause" alt="Pause" src="pause-1.png" />
    //         </div>
    //         <img className="fast-forward" alt="Fast forward" src="fast-forward-1.png" />
    //         <img className="fast-forward-2" alt="Fast forward" src="fast-forward-2.png" />
    //       </div> */}
    //       <PlayPause/>
    //     </div>
    //     <div className="overlap-15">
    //       <img className="model-24" alt="Model" src="model-1-35.png" />
    //     </div>
    //   </div>
    // </div>
  );
};
