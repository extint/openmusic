import React, { useState, useEffect } from 'react';
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
function Playlist(props) {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    const myToken = 'BQBrKWyUv0AhiHuVuGfm1qKPsDCOfcdiCbqi5V_5Gl1EqD1zvoQ2_rSxjPs53PNOLSw7tMKn-QzfPkjFgYn0I17DQXIBUgpdYboBCw2rVzYr1wZ6xqCD3qA15N4Dn1bshMzoJWbQjO2zK8v8CvqTUVF-Sq1VejosNYvbgivbi2oeyqu2lKvoZjtzalj2JUJpUWjUw1LtjxpjZfUAhYH5meYauHQo'

    useEffect(() => {

        // const script = document.createElement("script");
        // script.src = "https://sdk.scdn.co/spotify-player.js";
        // script.async = true;

        // document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(myToken); },
                volume: 0.5
            });

            setPlayer(player);

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

                async function logPlayerState(e) {
                    try{const currentState = await player.getCurrentState();
                    console.log(currentState, 'hi heloo');}
                    catch{console.log(e)}
                }
                logPlayerState();
                // player.getCurrentState().then( state => { 
                //     (!state)? setActive(false) : setActive(true) 
                // });
            }));


            player.connect();

        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img src={current_track.album.images[0].url}
                        className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                            current_track.name
                        }</div>

                        <div className="now-playing__artist">{
                            current_track.artists[0].name
                        }</div>
                    </div>
                    <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                        &lt;&lt;
                    </button>
                    <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                        {is_paused ? "PLAY" : "PAUSE"}
                    </button>

                    <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                        &gt;&gt;
                    </button>
                </div>
            </div>
        </>
    )
}

export default Playlist