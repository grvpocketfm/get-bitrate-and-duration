// https://vitejs.dev/guide/features.html#import-with-query-suffixes
import MetaDataWorker from "../workers/metadataWorker?worker&url";
import { useState, useEffect, useRef } from "react";
import { WorkerResponse } from "../workers/metadataWorker";

export function useAudioMetadataWorker() {
  const [metadata, setMetadata] = useState<{
    duration?: number;
    bitrate?: number;
  }>({});
  const [loading, setLoading] = useState(false);
  const workerInstance = useRef<Worker | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create worker instance
    // https://vitejs.dev/guide/features.html#import-with-constructors
    workerInstance.current = new Worker(
      new URL(MetaDataWorker, import.meta.url),
      { type: "module" }
    );

    console.log(workerInstance);

    workerInstance.current.onmessage = (
      event: MessageEvent<WorkerResponse>
    ) => {
      const { success, duration, bitrate, error } = event.data;

      console.log(event);
      if (success) {
        setMetadata({ duration, bitrate });
      } else {
        setError(error as string);
      }
      setLoading(false);
    };

    return () => {
      if (!workerInstance.current) return;
      workerInstance.current.terminate();
    };
  }, []);

  const calculateMetadata = (file: File) => {
    if (!workerInstance.current) return;

    setLoading(true);
    setMetadata({});
    workerInstance.current.postMessage({ file });
  };

  return { metadata, error, loading, calculateMetadata };
}
