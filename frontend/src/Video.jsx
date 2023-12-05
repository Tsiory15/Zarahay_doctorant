import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');
const Video = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      socket.emit('stream', imageSrc);
    }, 1000 / 15);

    return () => clearInterval(captureInterval);
  }, [socket]);

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
      />
    </div>
  );
};

export default Video;
