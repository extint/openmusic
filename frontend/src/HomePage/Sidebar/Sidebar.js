import React, { useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Sidebar = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [searchQ,setSearchQ]=useState("")
    const [searchR,setSearchR]=useState("")
    const searchQuery= async (e)=>{
        // console.log(e.target.value);
        setSearchQ(e.target.value)
        if(searchQ){
        try{
        const searchData = await axios.get("http://localhost:8000/search", {
            params: {
              q: searchQ
            },
            headers:{
              'Content-Type': "application/json"
            }
          });
          setSearchR(searchData.data);
          console.log(searchData.data, "This is my search data smiley face :)");
        } catch (err) {
          console.log(err);
        }
    }

    };
    return (
        <>
            <div className="sidebar">
                <div className="overlap-group">
                    <div className="side-artist-box">
                        {/* liked songs here */}
                        <div className="graybox">
                            <img className="likedSongs" src="/love-always-wins.png" onClick={() => { navigate(`/likedsongs`, { replace: true, state: props }) }} />
                            <div className="sideinfo">Liked Songs</div>
                        </div>
                        {/* artists */}
                        {props.artistsFollowed && props.artistsFollowed.map((item, index) => (
                            <div className="graybox">
                                <img className="Rmodel" src={item.images[0].url} onClick={() => { navigate(`/artist/${item.name}`, { replace: true, state: props }) }} />
                                <div className="sideinfo">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="libraryandsearch">
                    <div className="searchBox">
                    {/* <div className="tempDiv" style={{display:"flex"}}> */}
                        <img className="search" alt="Search" src="/search.png" />
                        <input type="text" className="search-text" placeholder = "Search Anything" onChange={searchQuery}></input>
                    {/* </div> */}
                        {/* <div className="preSearchResults"></div> */}
                        </div>

                    <img className="playlist" alt="Playlist" src="/playlists.png" />
                </div>
            </div>
        </>
    );
};