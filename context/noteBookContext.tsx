// create a context for listening to user changes

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getNotes, NotesData } from "@/firebase/db/notes";

import { useUser } from "./userContext";

interface NoteBookContenxtType {
  notebookData: NotesData[];
  currentNoteData: NotesData | null;
  setCurrentNoteData: Dispatch<SetStateAction<NotesData | null>>;
}

export const NoteBookDataContext = createContext<NoteBookContenxtType>({
  notebookData: [],
  currentNoteData: null,
  setCurrentNoteData: () => ({}),
});

export const NoteBookDataProvider = ({ children }: { children: ReactNode }) => {
  const [notebookData, setNoteBookData] = useState<NotesData[]>([]);
  const [currentNoteData, setCurrentNoteData] = useState<NotesData | null>(
    null
  );

  const { user } = useUser();

  useEffect(() => {
    console.log("User", user);
    if (!user) return;

    getNotes(user).then((data) => {
      console.log(data);
      setNoteBookData(data);
    });
  }, [user]);

  const value = {
    notebookData,
    currentNoteData,
    setCurrentNoteData,
  };

  return (
    <NoteBookDataContext.Provider value={value}>
      {children}
    </NoteBookDataContext.Provider>
  );
};

export const useNoteBookData = () => useContext(NoteBookDataContext);
