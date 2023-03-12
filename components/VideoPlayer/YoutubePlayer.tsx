type YoutubePlayerType = {
  src: string;
  width?: number;
  height?: number;
};

const YoutubePlayer = (props: YoutubePlayerType) => {
  return (
    <>
      <iframe
        width={props.width || "100%"}
        height={props.height || 315}
        src={props.src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default YoutubePlayer;
