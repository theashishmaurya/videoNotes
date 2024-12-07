// pages/api/chat-completion.js

import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { model, prompt, stream } = req.body;

  // Validate the input
  if (!model || !prompt) {
    res.status(400).json({ message: "Model and prompt are required" });
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.OLLAMA_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    model: model,
    prompt: prompt,
    stream: stream,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    // Make the external API call
    const externalResponse = await fetch(
      "http://home.heaust.org:3158/api/generate",
      requestOptions,
    );

    if (!externalResponse.ok) {
      throw new Error(`API responded with status: ${externalResponse.status}`);
    }

    const result = await externalResponse.text();
    res.status(200).json({ result: result });
  } catch (error) {
    console.error("Error in chat-completion API:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
