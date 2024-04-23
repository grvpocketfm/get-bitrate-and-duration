export interface IAudioMetadata {
  duration: string | null;
  bitrate: string | null;
}

export interface IAudioMetadataResult {
  metadata: IAudioMetadata;
  loading: boolean;
  error: string | null;
  calculateMetadata: (file: File) => Promise<void>;
}
