import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    token: null,
    name: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        role: action.payload.role,
      };
    },
    logout: (state, action) => {
      return {
        token: null,
        name: null,
        role: null,
      };
    },
  },
});

export default sessionSlice.reducer;
