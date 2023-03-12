import VideoPlayer from "@/components/VideoPlayer/videoPlayer";
import { getGptResponse } from "@/utils/openAiApi/chatGpt";
import { transcribeAudioFromUrl } from "@/utils/openAiApi/transcription";
import { Button, Col, Input, Row, Space } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const Note = () => {
  const [transcribedData, setTranscribedData] = useState("");
  const [markDownData, setMarkDownData] = useState("");
  const [url, setUrl] = useState("https://www.youtube.com/embed/uTWCPw3Tu-k");

  const handleConvert = async () => {
    const transcript = await transcribeAudioFromUrl(url);
    console.log(transcript);
    const response = await getGptResponse(transcript);
    console.log(response);
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
              onChange={(e) => setUrl(e.target.value)}
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
          <Editor />
        </Col>
      </Row>
    </>
  );
};

export default Note;
