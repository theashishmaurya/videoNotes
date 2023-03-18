import Directory from "@/components/notebook/directory";
import SideDrawer from "@/components/notebook/sideDrawer";

export default function NoteBook() {
  return (
    <>
      <SideDrawer>
        <Directory />
      </SideDrawer>
    </>
  );
}
