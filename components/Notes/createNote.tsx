import { convertToBlock } from "@/components/editor/utils";
import VideoPlayer from "@/components/VideoPlayer/videoPlayer";
import { useUser } from "@/context/userContext";
import { saveNotes } from "@/firebase/db/notes";
import { getGptResponse } from "@/utils/openAiApi/chatGpt";
import {
  getAudioFromUrl,
  transcribeAudio,
} from "@/utils/openAiApi/transcription";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { Button, Col, Input, message, Row, Space, Steps } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { ChangeEvent, useRef, useState } from "react";
import { checkIfValidUrl, convertYoutubeLink } from "./utils";
import { nanoid } from "nanoid";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const CreateNote = () => {
  const [transcribedData, setTranscribedData] = useState<string>();
  const [markDownData, setMarkDownData] = useState<string>();
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [url, setUrl] = useState("https://www.youtube.com/embed/uTWCPw3Tu-k");
  const [editorData, setEditorData] = useState<OutputData>();
  const EditorRef = useRef<EditorJS>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioBlob(undefined);
    setTranscribedData(undefined);
    setMarkDownData(undefined);
    setUrl(e.target.value);
  };

  const AddBlocks = (data: OutputData) => {
    // Append the data to the editor
    let newBlockData: OutputData = {
      ...data,
      blocks: [...(editorData?.blocks || []), ...data.blocks],
    };
    EditorRef.current?.render(newBlockData);
    setEditorData(newBlockData);
  };

  const handleConvert = async () => {
    setLoading(true);
    if (!url) return alert("Please enter a valid url");

    try {
      let audio = audioBlob; // Check if audioBlob is already set
      if (!audio) {
        audio = await getAudioFromUrl(url);
        setAudioBlob(audio);
      }

      let transcript = transcribedData; // Check if transcribedData is already set
      if (!transcript && audio) {
        setCurrentStep(1);
        transcript = await transcribeAudio(audio);
        setTranscribedData(transcript);
      }

      let markdown = markDownData;
      if (!markdown && transcript) {
        setCurrentStep(2);
        markdown = await getGptResponse(transcript);
        setMarkDownData(markdown);
        if (markdown) {
          console.log("Adding markdown block");
          AddBlocks(convertToBlock(markdown));
        }
      } else if (markdown) {
        AddBlocks(convertToBlock(markdown));
      }
    } catch (error) {
      setCurrentStep(0);
      setLoading(false);
      message.error(
        error && error instanceof Error ? error.message : "Something went wrong"
      );
      console.log(error);
    }
    setLoading(false);
    setCurrentStep(0);
  };

  const handleSaveToNotes = async () => {
    // get the pid from the url
    // create a new firebase document with the pid in notes collection
    // save the data to the document

    try {
      // TODO: Fix below issue
      if (!user) throw new Error("User is not logged in");
      if (editorData === undefined) throw new Error("Editor data is empty");
      if (transcribedData === undefined)
        throw new Error("Transcribed data is empty");
      saveNotes({
        id: nanoid(),
        title: editorData.blocks[0].data.text,
        url: url,
        content: editorData,
        transcribedData: transcribedData,
        date: new Date(),
        userId: user.uid,
      })
        .then(() => {
          message.success("Note saved successfully");
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      message.error(
        error && error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div>
      <Row gutter={60}>
        <Col span={24}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 10px 40px 10px",
              alignItems: loading ? " " : "center",
            }}
          >
            {loading ? (
              <Steps
                size="small"
                style={{ width: "100%" }}
                current={currentStep}
                items={[
                  {
                    title: "Getting Video",
                  },
                  {
                    title: "Transcribing",
                  },
                  {
                    title: "Generating Your Notes",
                  },
                ]}
              />
            ) : (
              <>
                <Input
                  addonBefore="https://"
                  size="large"
                  placeholder="Your Youtube Video URL"
                  style={{ width: 400 }}
                  value={url}
                  onChange={(e) => handleChange(e)}
                  status={checkIfValidUrl(url) ? "" : "error"}
                />

                <Button
                  type="primary"
                  onClick={() => {
                    handleConvert();

                    // AddBlocks(convertToBlock(data));
                  }}
                >
                  Convert
                </Button>
              </>
            )}
          </Space>
        </Col>

        <Col span={12}>
          <VideoPlayer
            url={checkIfValidUrl(url) ? convertYoutubeLink(url) : ""}
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            style={{}}
            onClick={() =>
              EditorRef.current?.save().then((data) => {
                // TODO: Make API call to save the data
                console.log("Save button clicked");

                handleSaveToNotes();
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
    </div>
  );
};

export default CreateNote;
