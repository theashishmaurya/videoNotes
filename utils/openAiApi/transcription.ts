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

export const transcribeAudio = async (audioBlob: BlobPart): Promise<any> => {
  // Transcribe the audio using the OpenAI API
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
          Authorization: `Bearer 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`,
        },
        body: formData,
      }
    );
    const json = await response.json();
    console.log(json);
    return json.text;
  } catch (error) {
    console.log(error);
    throw new Error("Transcription failed");
  }
};

export const transcribeAudioFromUrl = async (url: string): Promise<any> => {
  const response = await fetch(`/api/getYTVideo?url=${url}}`);
  console.log(response);
  const blob = await response.blob();
  const text = await transcribeAudio(blob);
  return text;
};
