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
import text from './text.json'
// const parameter = { name: 'John', age: 25 };
export const Homepage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userName, setUserName] = useState({
    userName:''
  })
  
  const params = useParams();
  console.log("params", params);
//   useEffect(() => {
//     // Fetch user data from your Node.js backend
//     const fetchData = async () => {
//     try {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:8000/user/verify",
//         {},
//         { withCredentials: true }
//       );
//       const { success, user } = data;
//       if(!success){
//         navigate('/login');
//       }
//       setUserName(user);
//       console.log("user",user);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
    
//   };

//   fetchData();
// }, []);

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
  { name: "Daily Mix 2" },
  { name: "Daily Mix 6" },
  { name: "Daily Mix 7" },
  { name: "Daily Mix 2" },
  { name: "Daily Mix 6" },
  { name: "Daily Mix 7" },
  { name: "Daily Mix 6" },
  { name: "Daily Mix 7" },
  ],
  // Add more items as needed
};
  return (
    <>
    <div className="homepage-container">
      <Recent{...exampleRecent} />
      <MainHome{...text}/>
      <Player/>
      <Navbar />
      <Sidebar />
    </div>
    </>
  );
};
