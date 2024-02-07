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
import { MLInt } from "./Player/MLInt";
// import MLInt from "./Player/MLInt";
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

  return (
    <>
      <div className="homepage-container">
        {/* <MLInt/> */}
        <Recent{...data} />
        <MainHome{...data} />
        <Player />
        {/* <Navbar /> */}
        <Sidebar{...data} />
      </div>
    </>
  );
};
