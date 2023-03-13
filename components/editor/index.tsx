import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import Image from "@editorjs/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { data } from "./data";
import { convertToBlock } from "./utils";
import dynamic from "next/dynamic";

type EditorProps = {
  markdown: string;
};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<EditorJS>();
  const { markdown } = props;

  useEffect(() => {
    editorRef.current?.blocks?.render(convertToBlock(markdown));
  }, [markdown]);

  useEffect(() => {
    if (!editorRef.current) {
      let editor = new EditorJS({
        holderId: "editorjs",
        //   holder: "editorjs",

        tools: {
          header: Header,
          list: List,
          image: Image,
          code: Code,
          inlineCode: InlineCode,
          marker: Marker,
          quote: Quote,
        },
        inlineToolbar: ["link", "marker", "bold", "italic"],

        onReady: () => {
          console.log("Editor.js is ready to work!");
        },

        onChange: () => {
          console.log("Something changed");
        },

        placeholder: "Let's write an awesome story!",
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* <button
        onClick={() => {
          editorRef.current
            ?.save()
            .then((outputData) => {
              console.log("Article data: ", outputData);
              setState(JSON.stringify(outputData));
              console.log("State: ", state);
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
        }}
      >
        Save
      </button> */}
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
