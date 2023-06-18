import { OutputData } from "@editorjs/editorjs";
import { DataNode } from "antd/es/tree";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseClient";

export interface NotesData {
  id: string;
  title?: string;
  url: string;
  content: OutputData;
  userId: string;
  transcribedData: string;
  date: Date;
}

export const saveNotes = async (notesData: NotesData) => {
  return await setDoc(doc(db, "notes", notesData.id), notesData);
};

export const getNotes = async (userId: string) => {
  //get all the notes where uid = userId
  //return the notes

  console.log("getNotes", userId);

  const q = query(collection(db, "notes"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);

  const notes: NotesData[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as NotesData;
    notes.push(data);
  });

  return notes;
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
