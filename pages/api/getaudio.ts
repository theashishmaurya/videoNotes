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
  try {
    const video = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
      dlChunkSize: 1024 * 1024,
      highWaterMark: 1024 * 1024,
    });
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");

    video
      .pipe(res, { end: true })
      .on("error", (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end("Failed to stream audio");
      })
      .on("finish", () => {
        res.end();
      });
  } catch (error) {
    res.status(400).send("Failed to get audio from url");
  }
};
