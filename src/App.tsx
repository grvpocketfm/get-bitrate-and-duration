import React, { ChangeEvent } from "react";
import { useAudioMetadata } from "./hooks/useAudioMetadata";

const AudioMetadataDisplay: React.FC = () => {
  const { metadata, loading, error, calculateMetadata } = useAudioMetadata();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      calculateMetadata(files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {metadata.duration && <p>Duration: {metadata.duration}</p>}
      {metadata.bitrate && <p>Bitrate: {metadata.bitrate}</p>}
    </div>
  );
};

export default AudioMetadataDisplay;
