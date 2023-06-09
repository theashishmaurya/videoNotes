/**
 * Transcription of a mp3 file to text using Wishper API
 * @param {BlobPart} file - mp3 file
 * @throws {Error} - if the transcription fails
 * @throws {Error} - if the file is not a mp3
 * @throws {Error} - if the file is too big
 * @returns {Promise<any>}  - the transcription of the audio file as text string or an error message
 * @example
 * const transcription = await transcribeAudio(audioBlob);
 * console.log(transcription);
 * // => "Hello, my name is John"
 * @see https://openai.com/blog/openai-wisper/ - OpenAI Whisper
 */

import { getApiKey } from "./getApiKey";

export const transcribeAudio = async (audioBlob: BlobPart): Promise<any> => {
  // Transcribe the audio using the OpenAI API
  try {
    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("file", new File([audioBlob], "audio.mp3"));
    if (formData.get("file") === null) {
      throw new Error("File is null");
    }
    // Check if the file is too big more than 25MB
    if (formData.get("file") instanceof File) {
      const file = formData.get("file") as File;
      if (file.size > 25 * 1024 * 1024) {
        throw new Error("File is too big");
      }
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getApiKey()}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      const json = await response.json();
      return json.text;
    } catch (error) {
      throw new Error("Failed to transcribe audio");
    }
  } catch (error) {
    console.log(error);
    error = error instanceof Error ? error.message : error;
    throw new Error((error as string) || "Failed to transcribe audio");
  }
};

export const getAudioFromUrl = async (url: string): Promise<any> => {
  try {
    const response = await fetch("http://localhost:8000/ytdl/mp3?url=" + url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    console.log(response);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get audio from url");
  }
};
