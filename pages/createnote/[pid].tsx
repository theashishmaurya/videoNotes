import Directory from "@/components/notebook/directory";
import SideDrawer from "@/components/notebook/sideDrawer";
import CreateNote from "@/components/Notes/createNote";
import HistoryPanel from "@/components/shared/historyPanel";
import { useRouter } from "next/router";

const Notes = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <p>{pid}</p>
      <CreateNote />
    </div>
  );
};

export default Notes;
