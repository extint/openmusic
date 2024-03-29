import React, { useEffect, useState } from "react";
import "./Playlistdisplay.css"
import { Navbar } from "../../../HomePage/Navbar/Navbar";
import { Sidebar } from "../../../HomePage/Sidebar/Sidebar";
import Player from "../../../HomePage/Player/player";
import axios from "axios";
import { useParams,useLocation } from "react-router-dom";
export const Playlistdisplay = (props) => {
    const params = useParams();
    const location = useLocation();
    const state = location.state; // Access the state object directly
    console.log(state, "playlistttttttttttttttttt");
    const [data, setData] = useState()
    const fetchPlaylist = async () => {
        try {
            // Verify token VERYFYING
            // const res = await axios.post(
            //   "http://localhost:8000/user/verify",
            //   {},
            //   { withCredentials: true }
            // );

            // const { message, success } = res.data;

            // if (!success) {
            //   console.log("Why wrong token?");
            //   navigate("/login");
            //   return;
            // }

            // Fetch home data
            const playlistData = await axios.get("http://localhost:8000/playlist", {
                params: {
                    playlistName: params.playlistName
                },
                headers: {
                    'Content-Type': "application/json"
                }
            });
            setData(playlistData.data);
            console.log(playlistData.data, "This is my home data smiley face :)");
        } catch (err) {
            console.log(err);
        }
    };
    useEffect({
        fetchPlaylist
    },[])
    return (
        <>
            <Navbar />
            <Sidebar {...state}/>
            <div id='playlisttitle'>
                <h1 class="name">Playlist</h1>
                <p class="desc">By: Name </p>
                <img class="play-buttton1" alt="Play buttton" src="play-buttton-1.png" />
            </div>
            <div class="songlist-container">
                <div class="attributes-container">
                    <div class="attribute">Title</div>
                    <div class="attribute">Album</div>
                    <div class="attribute">Date added</div>
                </div>

                <div class="songlist">
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                    <div class="listm">
                        <p>wdfghj</p>
                    </div>
                </div>
            </div>
            <Player />
        </>
    );
};