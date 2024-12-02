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
  allCommunities: {},
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
    getAllCommunities(state, action) {
      state.allCommunities = { ...action.payload };
    },
    addCommunities(state, action) {
      state.allCommunities.data = [
        action.payload,
        ...state.allCommunities.data,
      ];
    },
    addPersonalCummunites(state, action) {
      let selectedCommunity = state.allCommunities.data.find(
        (community) => community.id === action.payload
      );
      state.userMainCommunities.data = [
        ...state.userMainCommunities.data,
        selectedCommunity,
      ];
    },
    deleteCommunity(state, action) {
      state.userMainCommunities.data = state.userMainCommunities.data.filter(
        (community) => community.id !== action.payload
      );
      state.allCommunities.data = state.allCommunities.data.filter(
        (community) => community.id !== action.payload
      );
    },
  },
});

export default authSlice;
export const authSliceActions = authSlice.actions;
