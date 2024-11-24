import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postsAll: [],
  personalPosts: [],
  isPosted: false,
  loading: false,
  singlePost: [],
  error: null,
  showMobile: false,
  commentNot: false,
  likeNot: false,
};

const myToken = JSON.parse(localStorage.getItem("userInfo"));

export const fetchAllPosts = createAsyncThunk("/fetchAllPosts", async () => {
  try {
    const response = await axios.get("http://195.35.56.202:8080/post", {
      headers: {
        Authorization: `Bearer ${myToken.token}`,
      },
    });
    const { data } = response;    
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

export const fetchMyPosts = createAsyncThunk("/fetchMyPosts", async () => {
  try {
    const response = await axios.get("http://209.38.241.78:8080/users/me", {
      headers: {
        Authorization: `Bearer ${myToken.token}`,
      },
    });
    const { data } = response;    
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postSuccess: (state, action) => {
      state.personalPosts = action.payload;
    },
    removedPost: (state, action) => {
      state.personalPosts.posts = state.personalPosts.posts.filter(
        (post) => post.id !== action.payload
      );
    },
    addCommentNot: (state) => {
      state.commentNot = true;
    },
    addLikeNot: (state) => {
      state.likeNot = true;
    },
    changeMobile: (state, action) => {
      state.showMobile = action.payload;
    },
    singlePostSuccess: (state, action) => {
      state.singlePost = action.payload;
    },
    addLikedComment: (state, action) => {
      const likedId = action.payload;
      if (!state.likedComments.includes(likedId)) {
        state.likedComments.push(likedId);
        // Update localStorage with the new liked comment
        localStorage.setItem(
          "likedComments",
          JSON.stringify(state.likedComments)
        );
      }
    },
    addLikedPost: (state, action) => {
      const postId = action.payload;
      state.likedPost = postId;
      localStorage.setItem("likedPost", postId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.postsAll = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
      state.personalPosts = action.payload;
      state.loading = false;
    });

    builder.addMatcher(isPending(fetchAllPosts), (state) => {
      state.loading = true;
    });

    builder.addMatcher(isRejected(fetchAllPosts), (state) => {
      state.loading = false;
    });
  },
});

export const {
  postSuccess,
  changeMobile,
  singlePostSuccess,
  addCommentNot,
  addLikeNot,
  removedPost
} = postSlice.actions;

export default postSlice.reducer;
