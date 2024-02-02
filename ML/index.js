import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./css/ml.css"
import { drawRect } from "./utilites"
import Speech from "../Speech/speech";
    
let count = 0;
let name = "";

function Ml() {
  const [flag, setFlag] = useState(0);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    // console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
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
        var socket = new WebSocket('ws://127.0.0.1:8080/facenet')
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
            name = pred_log.id
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
      // console.log(obj);

      // if ((obj.find(el => el.class == 'cell phone'))) {
      //   setFlag(1)
      //   count++;
      // }
      if (obj.length > 1 || obj.length == 0) {
        setFlag(1);
        count++;
      }
      else {
        setFlag(0);
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  // const[person,setperson] = useState("")
  useEffect(() => {
    // Speech()
    runCoco()
    // setperson(name)
  }, []);

  return (
    <div className="Ml">
      <header className="Ml-header">
        <div className="Copy">
          <h1>{flag === 1 ? "Dont Copy." : null}</h1>
          <h1>Copied {count} many times</h1>
          {/* <h1>{person}</h1> */}
        </div>

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
            width: 300,
            height: 300,
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

        />
      </header>
    </div>
  );
}

export default Ml;