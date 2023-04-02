import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { DataNode } from "antd/es/tree";

export interface UserState {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  emailVerified: boolean;
  directory?: DataNode;
}

const initialState: UserState = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  emailVerified: false,
  directory: undefined,
};

// Create a slice of state for the user object

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
      state.emailVerified = action.payload.emailVerified;
      state.directory = action.payload.directory;
    },
    setDirectory: (state, action: PayloadAction<DataNode>) => {
      state.directory = action.payload;
    },
  },
});

export const { setUser, setDirectory } = userSlice.actions;

export default userSlice.reducer;
