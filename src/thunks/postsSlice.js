import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data;
  }
);

// Thunk to create a new post
export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  return response.data;
});

// Thunk to update a post
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    post
  );
  return response.data;
});

// Thunk to delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = "";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === +action.payload
        );
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      });
  },
});

export default postsSlice.reducer;
