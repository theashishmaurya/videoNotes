import Directory from "@/components/notebook/directory";
import NoteView from "@/components/notebook/noteView";
import SideDrawer from "@/components/notebook/sideDrawer";

export default function NoteBook() {
  return (
    <>
      <SideDrawer>
        <Directory />
        <NoteView />
      </SideDrawer>
    </>
  );
}
