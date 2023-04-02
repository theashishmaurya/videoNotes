import Directory from "@/components/notebook/directory";
import NoteView from "@/components/notebook/noteView";
import SideDrawer from "@/components/notebook/sideDrawer";
import CreateNote from "@/components/Notes/createNote";
import HistoryPanel from "@/components/shared/historyPanel";
import { useUser } from "@/context/userContext";
import { getDirectory } from "@/firebase/db/notes";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Notes = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <p>{pid}</p>
      <SideDrawer>
        <HistoryPanel />
        <NoteView />
      </SideDrawer>
    </div>
  );
};

export default Notes;
