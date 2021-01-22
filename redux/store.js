import { configureStore } from "@reduxjs/toolkit";
import allReducer from "./allSlice";

export default configureStore({
  reducer: {
    all: allReducer,
  },
});
