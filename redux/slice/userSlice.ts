import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  logedInUser: {},
  loading: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<any>) => {
      state.logedInUser = actions.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
