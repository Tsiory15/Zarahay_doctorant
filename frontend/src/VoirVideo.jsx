// MainComponent.jsx
import React, { useState } from 'react';
import Video from './Video';

const VoirVideo = () => {
  const [capturedVideo, setCapturedVideo] = useState(null);

  const handleDataCapture = (data) => {
    setCapturedVideo(data);
  };

  return (
    <div>
      {/* Afficher la vidéo capturée */}
      {capturedVideo && (
        <img src={capturedVideo} alt="Captured Video" />
      )}

      {/* Composant VideoStream pour la capture vidéo */}
      <Video onDataCapture={handleDataCapture} />
    </div>
  );
};

export default VoirVideo;
