import Directory from "@/components/notebook/directory";
import NoteView from "@/components/notebook/noteView";
import SideDrawer from "@/components/notebook/sideDrawer";
import CreateNote from "@/components/Notes/createNote";
import HistoryPanel from "@/components/shared/historyPanel";
import { NoteBookDataProvider } from "@/context/noteBookContext";
import { useUser } from "@/context/userContext";
import { getDirectory } from "@/firebase/db/notes";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Notes = () => {
  const router = useRouter();

  return (
    <NoteBookDataProvider>
      <SideDrawer>
        <HistoryPanel />
        <NoteView />
      </SideDrawer>
    </NoteBookDataProvider>
  );
};

export default Notes;
