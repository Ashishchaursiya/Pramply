import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  videoDetails: {},
};

export const videoSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {
    setVideoDetails: (state, action) => {
      state.videoDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVideoDetails } = videoSlice.actions;

export default videoSlice.reducer;
