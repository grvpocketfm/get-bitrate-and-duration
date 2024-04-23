import React, { ChangeEvent } from "react";
import { useAudioMetadataWorker } from "./hooks/useAudioMetadataWorker";

const AudioMetadataDisplay: React.FC = () => {
  const { metadata, loading, error, calculateMetadata } =
    useAudioMetadataWorker();

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
