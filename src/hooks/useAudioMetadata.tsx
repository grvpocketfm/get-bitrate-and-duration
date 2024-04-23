// hooks/useAudioMetadata.ts
import { useState } from "react";
import {
  IAudioMetadata,
  IAudioMetadataResult,
} from "../interfaces/IAudioMetadata";

export function useAudioMetadata(): IAudioMetadataResult {
  const [metadata, setMetadata] = useState<IAudioMetadata>({
    duration: null,
    bitrate: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateMetadata = async (file: File): Promise<void> => {
    if (!file) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Lazy Load music-metadata-browser
      const musicMetadata = await import("music-metadata-browser");
      const metadata = await musicMetadata.parseBlob(file, { duration: true });
      const durationInSeconds = metadata.format.duration as number;
      const fileSizeInBits = file.size * 8; // Convert bytes to bits
      const bitrate = fileSizeInBits / durationInSeconds / 1000; // Convert to kbps

      setMetadata({
        duration: durationInSeconds
          ? `${durationInSeconds.toFixed(2)} seconds`
          : "Unknown duration",
        bitrate: bitrate ? `${bitrate.toFixed(2)} kbps` : "Unknown bitrate",
      });
    } catch (err) {
      setError("Failed to parse file metadata.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { metadata, loading, error, calculateMetadata };
}
