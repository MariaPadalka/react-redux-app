import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../thunks/usersSlice";
import postsReducer from "../thunks/postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});
