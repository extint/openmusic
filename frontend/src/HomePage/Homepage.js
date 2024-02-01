import React from "react";
import "./HomePage.css";
import { Recent } from "./Recent/Recent";
import { MainHome } from "./MainHome/mainplaylists";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";
import { Player } from "./Player/player";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import text from './userText.json'
// const parameter = { name: 'John', age: 25 };
export const Homepage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState({
    likedSongs: [],
    recentSongs: [],
    artistsFollowed: [],
    recommendedSongs: []
  });

  const params = useParams();

  useEffect(() => {
    // Set userName after the component mounts
    setUserName(params.userName);
  }, [params.userName]);

  const fetchData = async () => {
    if (!cookies.token) {
      console.log("Where token?");
      navigate("/login");
      return;
    }

    try {
      // Verify token
      const res = await axios.post(
        "http://localhost:8000/user/verify",
        {},
        { withCredentials: true }
      );

      const { message, success } = res.data;

      if (!success) {
        console.log("Why wrong token?");
        navigate("/login");
        return;
      }

      // Fetch home data
      const homedata = await axios.get("http://localhost:8000/home", {
        params: {
          userName: params.userName
        },
        headers:{
          'Content-Type': "application/json"
        }
      });

      setData(homedata.data);
      console.log(homedata.data, "This is my home data smiley face :)");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch user data from your Node.js backend
    fetchData();
  }, [params.userName, cookies.token]);

  // const exampleArtists = {
  //   name: 'Vedant',
  //   container: [
  //     { artistName: 'Artist 1', songName: 'Song 1' },
  //     { artistName: 'Artist 2', songName: 'Song 2' },
  //     { artistName: 'Artist 3', songName: 'Song 3' },
  //     { artistName: 'Artist 4', songName: 'Song 2' },
  //     { artistName: 'Artist 5', songName: 'Song 3' },
  //     { artistName: 'Artist 6', songName: 'Song 2' },
  //     { artistName: 'Artist 7', songName: 'Song 3' },
  //     { artistName: 'Artist 8', songName: 'Song 2' },
  //     { artistName: 'Artist 9', songName: 'Song 3' },
  //     { artistName: 'Artist 10', songName: 'Song 2' },
  //     { artistName: 'Artist 11', songName: 'Song 3' },
  //     { artistName: 'Artist 12', songName: 'Song 2' },
  //     { artistName: 'Artist 13', songName: 'Song 3' },
  //     { artistName: 'Artist 14', songName: 'Song 2' },
  //     { artistName: 'Artist 15', songName: 'Song 3' },
  //     { artistName: 'Artist 16', songName: 'Song 2' },
  //     { artistName: 'Artist 16', songName: 'Song 3' },
  //     { artistName: 'Artist 17', songName: 'Song 2' },

  //     // Add more items as needed
  //   ],
  // };
  // const exampleRecent = {
  //   container: [
  //   { name: "Daily Mix 2" },
  //   { name: "Daily Mix 6" },
  //   { name: "Daily Mix 7" },
  //   { name: "Daily Mix 2" },
  //   { name: "Daily Mix 6" },
  //   { name: "Daily Mix 7" },
  //   { name: "Daily Mix 6" },
  //   { name: "Daily Mix 7" },
  //   ],
  //   // Add more items as needed
  // };
  // const userDetails=useParams()
  // const name=userDetails.userName
  // // Find the user's data based on the name parameter

  // const userData = text[name];
  // console.log(userData);

  // // If user data exists, get the liked songs and recent songs
  // const likedSongs = userData ? userData.likedSongs : [];
  // const recentSongs = userData ? userData.recentSongs : [];
  // const suggestedSongs = userData ? userData.recommendedSongs : [];

  return (
    <>
      <div className="homepage-container">
        <Recent{...data} />
        <MainHome{...data} />
        <Player />
        <Navbar />
        <Sidebar{...data} />
      </div>
    </>
  );
};
