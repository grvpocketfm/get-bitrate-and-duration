/// <reference lib="webworker" />

export type WorkerMessage = {
  file: File;
};

export type WorkerResponse = {
  success: boolean;
  duration?: number;
  bitrate?: number;
  error?: string;
};

// Good example to upload large files using the web worker
// https://github.com/tharunoptimus/simple-worker-upload/tree/main
self.addEventListener("message", async (event: MessageEvent<WorkerMessage>) => {
  console.log({ event });
  const { file } = event.data;

  try {
    const musicMetadata = await import("music-metadata-browser");
    const metadata = await musicMetadata.parseBlob(file, { duration: true });
    const durationInSeconds = metadata.format.duration as number;
    const fileSizeInBits = file.size * 8; // Convert bytes to bits
    const bitrate = fileSizeInBits / durationInSeconds / 1000; // Convert to kbps
    const response: WorkerResponse = {
      success: true,
      duration: durationInSeconds,
      bitrate: bitrate,
    };
    postMessage(response);
  } catch (error) {
    postMessage({
      success: false,
      error: "Failed to parse file metadata.",
    } as WorkerResponse);
  }
});
