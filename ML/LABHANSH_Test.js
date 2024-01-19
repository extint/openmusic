// ReactComponent.js

import React, { useState, useEffect } from 'react';

const ReactComponent = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchVideoFeed = async () => {
      try {
        const response = await fetch('http://localhost:8000/video_feed');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reader = response.body.getReader();

        while (true) {
          const { value, done } = await reader.read();

          if (done) {
            break;
          }

          const blob = new Blob([value], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching video feed:', error);
      }
    };

    fetchVideoFeed();

    return () => {
      // Cleanup (e.g., close the stream if necessary)
    };
  }, []);

  return (
    <div>
      {imageSrc && <img src={imageSrc} alt="Video Feed" />}
    </div>
  );
};

export default ReactComponent;
