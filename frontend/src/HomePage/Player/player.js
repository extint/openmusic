import React from "react";
import { useState, useEffect } from 'react';
import "./player.css";
const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}
export const Player = () => {
    const [player, setPlayer] = useState({});
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    const myToken = 'BQBmBqRSura4LisLH_SwEUCyygXHO6Uuksbtuf8CTxjsyU5KPzBfyYKWrPxOsEA7d44xpppL9BUb_CMWlji-jPy1PjvXPVV1ASUIjuDGEmrR2uNf0biZRluAG0236xQ16wsvIhkuWJk8vbE6LJqAI3gX5zGtaeXjruo8Zvr2lQD6Wp37g95NGRlMA1i47gLFcc_1S_VxAHuJlB6npWmqJYG6ZZFh'

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(myToken); },
                volume: 1.0
            });

            setPlayer(player);
            console.log(player)

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            player.addListener('player_state_changed', (state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);
                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));
            player.connect();

        };
    }, []);
    return (
        <div className="box">
            <div className="player-bar">
                <div className="now-playing__side">
                    <img src={current_track.album.images[0].url}
                        className="now-playing__cover" alt="" />
                    <div className="now-playing__name">{
                        current_track.name
                    }</div>

                    <div className="now-playing__artist">{
                        current_track.artists[0].name
                    }</div>
                </div>
                {/* <div className="overlap-group">
                    <div className="overlap"> */}
                <img className="img" alt="Previous Track" src="/fast-forward-2.png" onClick={() => { player.previousTrack() }} />
                {is_paused ? (
                    <img className="pause" alt="Pause" src="/play-buttton-1.png" onClick={() => { player.togglePlay() }} />
                ) : (
                    <img className="play" alt="Play" src="/pause-1.png" onClick={() => { player.togglePlay() }} />
                )}
                <img className="fast-forward" alt="Next Track" src="/fast-forward-1.png" onClick={() => { player.nextTrack() }} />

                {/* </div>
                </div> */}
            </div>
        </div>
    );
};