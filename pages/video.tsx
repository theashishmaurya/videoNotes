import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { transcribeAudio } from "@/utils/openAiApi/transcription";
function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transcription, setTranscription] = useState("");

  const handleConvert = async () => {
    // Load ffmpeg
    fetch("/api/getYTVideo?url=https://www.youtube.com/watch?v=VrROijXPi4I")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response.blob);
        return response.blob();
      })
      .then(async (blob) => {
        transcribeAudio(blob).then((transcription) => {
          setTranscription(transcription);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div>
      <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      <button onClick={handleConvert}>Convert</button>
      <div>{transcription}</div>
    </div>
  );
}

export default App;
