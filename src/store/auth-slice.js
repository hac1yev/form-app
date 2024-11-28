import { createSlice } from "@reduxjs/toolkit";

const getUserInfo = () => {
  const userInfo = window.localStorage.getItem("userInfo");

  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {};
  }
};

const initialAuthState = {
  userInfo: getUserInfo(),
  userMainInfos: {},
  userMainCommunities: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    getUser(state, action) {
      state.userInfo = { ...action.payload };
    },
    getUserMainInfos(state, action) {
      state.userMainInfos = { ...action.payload };
    },
    deleteMyPost(state, action) {
      state.userMainInfos.posts = state.userMainInfos.posts.filter(
        (post) => post.id !== action.payload
      );
    },
    addPost(state, action) {
      state.userMainInfos.posts = [
        action.payload,
        ...state.userMainInfos.posts,
      ];
    },
    getUserCommunties(state, action) {
      state.userMainCommunities = { ...action.payload };
    },
  },
});

export default authSlice;
export const authSliceActions = authSlice.actions;
