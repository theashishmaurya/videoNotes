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
  user: string | null;
  directoryData: DataNode[];
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContext>({
  user: null,
  directoryData: [],
  setUser: () => ({}),
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [directoryData, setDirectoryData] = useState<DataNode[]>([]);

  const value = {
    user,
    setUser,
    directoryData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
