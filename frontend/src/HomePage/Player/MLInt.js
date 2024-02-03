import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
// import { Howl, Howler } from 'howler';

let count = 0;
let song_command_ = "";
export let Fvolume
export const  MLInt=()=> {
  const [flag, setFlag] = useState(0);
  const [songcommand, setSong] = useState("");
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)
  const [volume, setVolume] = useState(0);
  // const sound=useRef(null);

  // Main function
  const run_model = async () => {
    setInterval(() => {
      detect();
      facenet();
    }, 2000);
  };



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
      var socket = new WebSocket('ws://127.0.0.1:8013/gazecontrol')
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const data = canvas.toDataURL("image/jpeg");

      socket.onopen = () => {
        console.log("Connection done")
        socket.send(data)
      }

      socket.onmessage = function (event) {
        var pred_log = JSON.parse(event.data)
        console.log(pred_log);
        setVolume(pred_log.curr_volume);
        Fvolume=volume
        // sound.volume(pred_log.curr_volume/100);
        // console.log(sound.volume)
        // curr_volume_ = pred_log.curr_volume;
        setSong(pred_log.song_command);
      }
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

      const obj = await detect();
      // console.log(obj);

    }
  };

  // const[person,setperson] = useState("")
  useEffect(() => {
    run_model()
  }, [volume]);



  return (
    <div>
      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          display: "none",
        }}
      />
      <canvas
        ref={canvasRef}
      />
      <div className="volume">{volume}</div>
      </div>
      );
}