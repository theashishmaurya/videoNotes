// create a context for listening to user changes

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/firebase/firebaseClient";
import { User } from "firebase/auth";
import { DataNode } from "antd/es/tree";
import { getDirectory } from "@/firebase/db/notes";

interface UserContext {
  user: User | null;
  directoryData: DataNode[];
}

export const UserContext = createContext<UserContext>({
  user: null,
  directoryData: [],
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [directoryData, setDirectoryData] = useState<DataNode[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = {
    user,
    directoryData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
