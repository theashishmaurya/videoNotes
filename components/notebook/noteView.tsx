import { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
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
  const [editorData, setEditorData] = useState<OutputData>();

  useEffect(() => {
    if (!currentNoteData) return;
    console.log(EditorRef.current);
    setEditorData(currentNoteData.content);
  }, [currentNoteData]);

  useEffect(() => {
    if (!editorData) return;
    console.log(editorData);
    EditorRef.current?.render(editorData);
  }, [editorData]);

  return (
    <div>
      {/* <div>TaBs</div> */}
      <Editor
        // ref={EditorRef}
        data={editorData}
        onChange={setEditorData}
        editorRef={EditorRef}
      />
    </div>
  );
};

export default NoteView;
