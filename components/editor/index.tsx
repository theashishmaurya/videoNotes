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

// Import EditorJS  as a dynamic component

const Editor = () => {
  const [state, setState] = useState("");
  const editorRef = useRef<EditorJS>();
  // Wrap below code in useCallBack hook

  useEffect(() => {
    const init = async () => {
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

          //   highlight: {
          //     shortcut: "CMD+SHIFT+H",

          //     config: {
          //       // default color for marker
          //       markerDefaultColor: "yellow",
          //       // default color for background
          //       markerDefaultBackgroundColor: "green",
          //       // array of possible colors for marker
          //       markerColors: ["yellow", "orange", "red", "green", "blue"],
          //       // array of possible colors for background
          //       markerBackgroundColors: [
          //         "yellow",
          //         "orange",
          //         "red",
          //         "green",
          //         "blue",
          //       ],
          //       // additional classname for Tool's button
          //       className: "some-class",

          //       // messages
          //       messages: {
          //         UI: {
          //           button: "Highlight",
          //         },
          //       },
          //     },
          //   },
        },
        inlineToolbar: ["link", "marker", "bold", "italic"],

        onReady: () => {
          console.log("Editor.js is ready to work!");
        },

        onChange: () => {
          console.log("Something changed");
        },

        data: {
          blocks: convertToBlock(data),
        },

        placeholder: "Let's write an awesome story!",
      });

      await editor.isReady;

      editorRef.current = editor;
    };

    init();

    return () => {
      editorRef.current?.destroy();
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
