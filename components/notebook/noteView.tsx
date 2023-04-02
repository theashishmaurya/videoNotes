import { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { useNoteBookData } from "@/context/noteBookContext";
import { data } from "../editor/data";
import { convertToBlock } from "../editor/utils";

// Dynamic import of EditorJS
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const NoteView = () => {
  const EditorRef = useRef<EditorJS>();
  const { currentNoteData } = useNoteBookData();

  // useEffect(() => {
  //   if (!currentNoteData) return;
  //   console.log(EditorRef.current);
  //   EditorRef.current?.render(currentNoteData.content);
  // }, [currentNoteData]);

  return (
    <div>
      {/* <div>TaBs</div> */}
      <Editor
        ref={EditorRef}
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
