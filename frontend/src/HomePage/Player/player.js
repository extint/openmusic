import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { accessToken } from "../../accessToken";
import "./player.css"
// import "./ml.css"
// import { debounce } from 'lodash';

let count = 0;
let song_command_ = "";

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

function Player() {
  const [flag, setFlag] = useState(0);
  const [songcommand, setSong]=useState("");
  const [volume, setVolume] =useState(0);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const sound=useRef(null);

  // Main function
  let socket;
  const run_model = async () => {
    socket = new WebSocket('ws://127.0.0.1:8015/gazecontrol')
    socket.onopen = () => {
    console.log("Connection done")
  
    }
    setInterval(() => {
      detect();
      facenet();
    }, 2000);
  };
  // const {Howl,Howler} =require('howler');

  const [player, setPlayer] = useState({});
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const myToken = accessToken

  useEffect(() => {

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
              name: 'opium',
              getOAuthToken: cb => { cb(myToken); },
              volume: 1.0
          });

          setPlayer(player);
          console.log(player);

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
  
  
  
  
  const facenet = async () => {
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        console.log("available")
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // var socket = new WebSocket('ws://127.0.0.1:8080/facenet')
        // var socket = new WebSocket('ws://127.0.0.1:8015/gazecontrol')
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        const data = canvas.toDataURL("image/jpeg");
        socket.send(data)
        

        socket.onmessage = function (event) {
            var pred_log = JSON.parse(event.data)
            console.log(pred_log);
            setVolume(pred_log.curr_volume);
            // sound.volume(pred_log.curr_volume/100);
            // player.setVolume(pred_log.curr_volume/100);
            console.log(player.volume)  
            // curr_volume_ = pred_log.curr_volume;
            setSong(pred_log.song_command);
        }
        // if (sound.current) {
        //   sound.current.volume(volume / 100);
        // }
    }
    else {
        console.log("unavailable")
    }
};

  const detect = async () => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections

      // const obj = await detect();
    }
  };

  // const[person,setperson] = useState("")
  useEffect(() => {
    run_model()
  }, []);


  useEffect(() => {
    if (player && player.setVolume) {
      player.setVolume(volume / 100);
    }
    // if (player ) {
    //   // player.setVolume(volume / 100);
    //   console.log(songcommand)
    //   if (songcommand === "NEXT SONG") {
    //     player.nextTrack();
    //   }
    //   if (songcommand === "PREVIOUS SONG") {
    //     player.previousTrack();
    //   }
    // }
  }, [volume, player]);

  useEffect(() => {

    if (player ) {
      // player.setVolume(volume / 100);
      console.log(songcommand)
      if (songcommand === "NEXT SONG") {
        player.nextTrack();
      }
      if (songcommand === "PREVIOUS SONG") {
        player.previousTrack();
      }
    }
  }, [songcommand, player]);


  return (
    
    <div className="box">

        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 400,
            height: 400,   
            // display:"none",
            
          }}
        />

        <canvas
          ref={canvasRef}
        /> 
      
    <div className="player-bar">
      <div className="now-playing__side">
        <img
          src={current_track.album.images[0].url}
          className="now-playing__cover"
          alt=""
        />
        <div className="now-playing__name">{current_track.name}</div>
        <div className="now-playing__artist">{current_track.artists[0].name}</div>
      </div>
      <img
        className="img"
        alt="Previous Track"
        src="/fast-forward-2.png"
        onClick={() => {
          player.previousTrack();
        }}
      />
      {is_paused ? (
        <img
          className="pause"
          alt="Pause"
          src="/play-buttton-1.png"
          onClick={() => {
            player.togglePlay();
          }}
        />
      ) : (
        <img
          className="play"
          alt="Play"
          src="/pause-1.png"
          onClick={() => {
            player.togglePlay();
          }}
        />
      )}
      <img
        className="fast-forward"
        alt="Next Track"
        src="/fast-forward-1.png"
        onClick={() => {
          player.nextTrack();
        }}
      />
    </div>
    </div>
    

  );
}

export default Player;