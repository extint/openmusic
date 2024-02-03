import React, { useEffect, useState } from "react";
import "./Recent.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { accessToken } from "../../accessToken";

export const Recent = (props) => {
  const myToken = accessToken;
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [hoveredColor, setHoveredColor] = useState("transparent");

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.blur');
      if (cursor) {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageHover = (e) => {
    const image = e.target;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Create a new Image object to preload the image
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Set crossOrigin to allow accessing the image data
    img.src = image.src;

    img.onload = function () {
      // Set canvas dimensions to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      context.drawImage(img, 0, 0);

      // Get the average color of the image
      const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const rgba = { r: 0, g: 0, b: 0, a: 0 };

      for (let i = 0; i < pixelData.length; i += 4) {
        rgba.r += pixelData[i];
        rgba.g += pixelData[i + 1];
        rgba.b += pixelData[i + 2];
        rgba.a += pixelData[i + 3];
      }

      const pixelCount = pixelData.length / 4;

      rgba.r = Math.round(rgba.r / pixelCount);
      rgba.g = Math.round(rgba.g / pixelCount);
      rgba.b = Math.round(rgba.b / pixelCount);
      rgba.a = Math.round(rgba.a / pixelCount);

      const rgb = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
      setHoveredColor(rgb);
      const mouse = document.querySelector('.blur')
      if (mouse) {
        mouse.style.background = rgb
      }
      const playy = document.querySelector('.Play');
      if (playy) {
        playy.style.borderLeft = `$30 px solid ${rgb}`;
      }
    };
  };

  const isDarkColor = (color) => {
    const rgb = color.substring(4, color.length - 1)
      .replace(/ /g, '')
      .split(',');

    const brightness = (parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114) / 1000;

    return brightness < 128;
  };

  const handleClick = async (e) => {
    try {
      const songId = e;
      setSelectedSongId(songId === selectedSongId ? null : songId);
      await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A${songId}`, {}, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${myToken} `
        }
      });
      await axios.post("https://api.spotify.com/v1/me/player/next", {}, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recent-tab" >
      <div className="blur" />
      <div className="inner-recent-box">
        {props.recentSongs.map((item, index) => (
          <div className="overlap" key={index}>
            <button className="Play" onClick={() => handleClick(item.songId)} data-song-id={item.songId} />
            <Link to="/song" key={index}>
              <img
                className="recentModel"
                alt="Model"
                data-song-id={item.songId}
                src={item.images[0].url}
                onMouseEnter={handleImageHover}
              />
            </Link>
            <div className="recent-text-wrapper">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
