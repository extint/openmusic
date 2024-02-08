import React from "react";
import "./Playlistdisplay.css"
import { Navbar } from "../../../HomePage/Navbar/Navbar";
import { Sidebar } from "../../../HomePage/Sidebar/Sidebar";
import Player  from "../../../HomePage/Player/player";
export const Playlistdisplay = (props) => {
    
    return (
        <>
        <Navbar/>
        <Sidebar/>
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
            <Player/>
        </>
    );
};