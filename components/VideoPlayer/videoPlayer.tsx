import YoutubePlayer from "./YoutubePlayer";

const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <>
      <YoutubePlayer src={url} />
    </>
  );
};

export default VideoPlayer;
