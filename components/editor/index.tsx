import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import Image from "@editorjs/image";
import React, { forwardRef, MutableRefObject, useEffect } from "react";

interface EditorProps {
  data?: OutputData;
  onChange(val: OutputData): void;
  editorRef: MutableRefObject<EditorJS | undefined>;
}
// eslint-disable-next-line react/display-name
export type EditorForwardRef = {
  editor: EditorJS;
};

const Editor = forwardRef((props: EditorProps, ref) => {
  const { editorRef } = props;

  useEffect(() => {
    if (!editorRef.current) {
      let editor = new EditorJS({
        holder: "editorjs",
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

        onChange: async (api, event) => {
          console.log("something changed");
          const data = await api.saver.save();
          props.onChange(data);
        },
        data: props.data,

        placeholder: "Let's write an awesome story!",
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        id="editorjs"
        style={{
          minWidth: "100%",
          color:"#000"
        }}
      ></div>
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;

// export default dynamic(() => Promise.resolve(Editor), { ssr: false });
