import React, { useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Sidebar = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [searchQ, setSearchQ] = useState("")
    const [searchR, setSearchR] = useState("")
    const [searchBlock, setSearchBlock] = useState(false)
    useEffect(() => {
        if (searchQ) {
            setSearchBlock(true)
            console.log("true kiya useffect mai")
        } else {
            setSearchBlock(false)
        }
    }, [searchR]);

    const searchQuery = async (e) => {
        // console.log(e.target.value);
        setSearchQ(e.target.value)
        if (searchQ) {
            try {
                const searchData = await axios.get("http://localhost:8000/search", {
                    params: {
                        q: searchQ
                    },
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                setSearchR(searchData.data);
                console.log(searchData.data, "This is my search data smiley face :)");
                if (searchData.data) {
                    setSearchBlock(true)
                    console.log(searchBlock, "yahape")
                }
                else {
                    setSearchBlock(false)
                }
            } catch (err) {
                console.log(err);
            }
        }
        // setSearchBlock(false)
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
                    <div className="searchBox" onMouseLeave={() => { if (searchBlock) setSearchBlock(false) }}>
                        {/* <div className="tempDiv" style={{display:"flex"}}> */}
                        <img className="search" alt="Search" src="/search.png" />
                        <input type="text" className="search-text" placeholder="Search Anything" onChange={searchQuery}></input>
                        {/* </div> */}
                        <div className={searchBlock ? ("SearchResults") : ("preSearchResults")}>
                            {searchR && searchR.artists.map((item, index) => (
                                <div className="searchOutput" key={index}>
                                    <img className="sModel" alt="Model" src={item.images[0].url && item.images[0].url} />
                                    <div className="sSong">{item.name}</div>
                                </div>
                            ))}
                            {searchR && searchR.tracks.map((item, index) => (
                                <div className="searchOutput" key={index}>
                                    <img className="sModel" alt="Model" src={item.images[0].url && item.images[0].url} />
                                    <div className="sSong">{item.name}</div>
                                    <br/>
                                    <div className="sArtist">{item.artists[0].name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <img className="playlist" alt="Playlist" src="/playlists.png" />
                </div>
            </div>
        </>
    );
};