export const checkIfValidUrl = (url: string) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
  const youtubeMatch = url.match(youtubeRegex);

  return youtubeMatch ? true : false;
};

export const convertYoutubeLink = (url: string) => {
  const youtubeId =
    /(?<=v=)[\w-]+|(?<=be\/)[\w-]+|(?<=v\/)[\w-]+|(?<=embed\/)[\w-]+/g;
  const videoId = url.match(youtubeId);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId[0]}`;
  } else {
    throw new Error("Invalid youtube link");
  }
};
