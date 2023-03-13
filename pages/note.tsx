import VideoPlayer from "@/components/VideoPlayer/videoPlayer";
import { getGptResponse } from "@/utils/openAiApi/chatGpt";
import {
  getAudioFromUrl,
  transcribeAudio,
} from "@/utils/openAiApi/transcription";
import { Button, Col, Input, message, Row, Space } from "antd";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const Note = () => {
  const [transcribedData, setTranscribedData] = useState("");
  const [markDownData, setMarkDownData] = useState("Write something...");
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [url, setUrl] = useState("https://www.youtube.com/embed/uTWCPw3Tu-k");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioBlob(undefined);
    setTranscribedData("");
    setMarkDownData("write something...");
    setUrl(e.target.value);
  };

  const handleConvert = async () => {
    if (!url) return alert("Please enter a valid url");

    try {
      let audio = audioBlob; // Check if audioBlob is already set
      if (!audio) {
        audio = await getAudioFromUrl(url);
        setAudioBlob(audio);
      }

      let transcript = transcribedData; // Check if transcribedData is already set
      if (!transcript && audio) {
        transcript = await transcribeAudio(audio);
        setTranscribedData(transcript);
      }

      let markdown = markDownData; // Check if markDownData is already set
      if (!markdown) {
        markdown = await getGptResponse(transcript);
        setMarkDownData(markdown);
      }
    } catch (error) {
      message.error(
        error && error instanceof Error ? error.message : "Something went wrong"
      );
      console.log(error);
    }
  };
  return (
    <>
      <Row gutter={60}>
        <Col span={24}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 10px 40px 10px",
              alignItems: "center",
            }}
          >
            <Input
              addonBefore="https://"
              size="large"
              placeholder="Your Youtube Video URL"
              style={{ width: 400 }}
              value={url}
              onChange={(e) => handleChange(e)}
            />
            <Input
              size="large"
              placeholder="Your Youtube Video URL"
              style={{ width: 400 }}
              value={markDownData}
              onChange={(e) => setMarkDownData(e.target.value)}
            />
            <Button type="primary" onClick={handleConvert}>
              Convert
            </Button>
          </Space>
        </Col>

        <Col span={12}>
          <VideoPlayer url={url} />
        </Col>
        <Col span={12}>
          <Editor markdown={markDownData} />
        </Col>
      </Row>
    </>
  );
};

export default Note;
