import { OutputData } from "@editorjs/editorjs";
import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { data } from "../editor/data";
import { convertToBlock } from "../editor/utils";
import dynamic from "next/dynamic";

// Dynamic import of EditorJS
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const NoteView = () => {
  const EditorRef = useRef<EditorJS>();

  return (
    <div>
      {/* <div>TaBs</div> */}
      <Editor
        data={convertToBlock(data)}
        onChange={function (val: OutputData): void {
          throw new Error("Function not implemented.");
        }}
        editorRef={EditorRef}
      />
    </div>
  );
};

export default NoteView;
