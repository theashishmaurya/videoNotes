// Download the Youtube video and send it to client

import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  console.log(url);

  if (typeof url !== "string") {
    res.status(400).send("URL is not a string");
    return;
  }

  const video = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
  });

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");

  video.pipe(res);
};
