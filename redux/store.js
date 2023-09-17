import { configureStore } from "@reduxjs/toolkit";
import watchListSlice from "./features/watchList";

export const store = configureStore({
  reducer: {
    watchList: watchListSlice,
  },
});
