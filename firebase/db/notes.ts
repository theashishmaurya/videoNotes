import { OutputData } from "@editorjs/editorjs";
import { DataNode } from "antd/es/tree";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseClient";

interface NotesData {
  id: string;
  url: string;
  content: OutputData;
  userId: string;
  transcribedData: string;
  date: Date;
}

export const saveNotes = async (notesData: NotesData) => {
  return await setDoc(doc(db, "notes"), notesData);
};

export const getNotes = async (userId: string) => {
  const notesRef = doc(db, "notes", userId);
  const docSnap = await getDoc(notesRef);
};

export const updateDirectory = async (
  userId: string,
  directory: DataNode[]
) => {
  console.log("updateDirectory", userId, directory);

  const docRef = doc(db, "users", userId);

  return await setDoc(
    docRef,
    { directory: JSON.stringify(directory) },
    { merge: true }
  );
};

export const getDirectory = async (userId: string) => {
  const docRef = doc(db, "users", userId);

  const data = (await getDoc(docRef)).data();

  if (data) {
    const directory: DataNode[] = JSON.parse(data.directory);
    return directory;
  }
  return [];
};
