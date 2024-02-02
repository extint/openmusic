import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./css/ml.css"

let count = 0;
let curr_volume_=" ";
let song_command_ = "";

function Ml() {
  const [flag, setFlag] = useState(0);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const run_model = async () => {
    setInterval(() => {
      detect(net);
      facenet();
    }, 4000);
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

        var socket = new WebSocket('ws://127.0.0.1:8013/gazecontrol')
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // canvas.getContext("2d").drawImage(video, 0, 0);
        const data = canvas.toDataURL("image/jpeg");

        socket.onopen = () => {
            console.log("Connection done")
            socket.send(data)
        }

        socket.onmessage = function (event) {
            var pred_log = JSON.parse(event.data)
            console.log(pred_log);
            curr_volume_ = pred_log.curr_volume;
            song_command_=pred_log.song_command;
        }
    }
    else {
        console.log("unavailable")
    }
};

  const detect = async (net) => {
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

      const obj = await net.detect(video);
      

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
    }
  };

  // const[person,setperson] = useState("")
  useEffect(() => {
    // Speech()
    run_model()
    // setperson(name)
  }, []);

  return (
    <div className="Ml">
      <header className="Ml-header">
        <div className="Copy">
          <h1>S</h1>
          {/* <h1>Current Volume: {curr_volume_}, Song Command: {song_command_} </h1> */}
          {/* <h1>{person}</h1> */}
        </div>

        {/* <Webcam
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
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 300,
            height: 300,
          }}

        /> */}
      </header>
    </div>
  );
}

export default Ml;