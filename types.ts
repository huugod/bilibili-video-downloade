
export interface VideoFormat {
  quality: string;
  format: string;
  size: string;
  downloadUrl: string;
}

export interface VideoInfo {
  title: string;
  thumbnailUrl: string;
  formats: VideoFormat[];
}
