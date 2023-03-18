import { EditorForwardRef } from "@/components/editor";
import { data } from "@/components/editor/data";
import { convertToBlock } from "@/components/editor/utils";
import VideoPlayer from "@/components/VideoPlayer/videoPlayer";
import { getGptResponse } from "@/utils/openAiApi/chatGpt";
import {
  getAudioFromUrl,
  transcribeAudio,
} from "@/utils/openAiApi/transcription";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { Button, Col, Input, message, Row, Space } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { ChangeEvent, useRef, useState } from "react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const Note = () => {
  const [transcribedData, setTranscribedData] = useState<string>();
  const [markDownData, setMarkDownData] = useState<string>();
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [url, setUrl] = useState("https://www.youtube.com/embed/uTWCPw3Tu-k");
  const [editorData, setEditorData] = useState<OutputData>();
  const EditorRef = useRef<EditorJS>();
  const [loader, setLoader] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioBlob(undefined);
    setTranscribedData(undefined);
    setMarkDownData(undefined);
    setUrl(e.target.value);
  };

  const AddBlocks = (data: OutputData) => {
    // Append the data to the editor
    let dummy: OutputData = {
      ...data,
      blocks: [...(editorData?.blocks || []), ...data.blocks],
    };
    console.log(dummy);
    EditorRef.current?.render(dummy);
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

      let markdown = markDownData;
      if (!markdown && transcript) {
        markdown = await getGptResponse(transcript);
        setMarkDownData(markdown);
        if (markdown) {
          console.log("Adding markdown block");
          AddBlocks(convertToBlock(markdown));
        }
      } else if (markdown) {
        console.log("Adding else block");
        AddBlocks(convertToBlock(markdown));
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
            <Button type="primary" onClick={handleConvert}>
              Convert
            </Button>
          </Space>
        </Col>

        <Col span={12}>
          <VideoPlayer url={url} />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            style={{}}
            onClick={() =>
              EditorRef.current?.save().then(() => {
                // TODO: Make API call to save the data
                console.log(editorData);
              })
            }
          >
            Save
          </Button>
          <div>
            <Editor
              data={editorData}
              onChange={setEditorData}
              editorRef={EditorRef}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Note;
