import { useUser } from "@/context/userContext";
import { db } from "@/firebase/firebaseClient";
import { message } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

interface UserInfo {
  isAuthorized: boolean;
  username: string;
}

const useSaveUserInfo = (userInfo: UserInfo) => {
  const { isAuthorized, username } = userInfo;
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { setUser } = useUser();

  if (!isAuthorized) {
    return;
  }

  const saveInfoToDb = async () => {
    try {
      const docRef = doc(db, "users", username); // create a reference to the user document in the database

      // check if user exists in the database
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        await setDoc(docRef, {
          uid: username,
          email: username,
          displayName: "",
          photoURL: "",
          emailVerified: "",
        });
      }

      return {
        username: username,
        status: "success",
        message: "User info saved successfully",
      };

      // redirect to the home page
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
        throw error;
      } else {
        message.error("Something went wrong please try again later");
        throw new Error("Something went wrong please try again later");
      }
    }
  };

  if (isAuthorized && !currentUser) {
    setCurrentUser(username);
    setUser(username);

    saveInfoToDb();
  }

  return {
    currentUser,
  };
};

export default useSaveUserInfo;
