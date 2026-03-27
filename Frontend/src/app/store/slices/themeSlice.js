// features/theme/themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

// themeSlice.js

const initialState = {
  mode: localStorage.getItem("theme") || "dark"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme",state.mode)
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;