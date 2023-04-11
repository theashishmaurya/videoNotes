import NoteView from "@/components/notebook/noteView";
import SideDrawer from "@/components/notebook/sideDrawer";
import HistoryPanel from "@/components/shared/historyPanel";
import { NoteBookDataProvider } from "@/context/noteBookContext";

const Notes = () => {
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
