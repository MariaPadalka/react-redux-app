import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    currentUser: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
