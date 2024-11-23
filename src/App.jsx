import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import { Box } from "@mui/material";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Popular from "./pages/Popular/Popular";
import { useDispatch, useSelector } from "react-redux";
import Search from "./pages/Search/Search";
import CategoryPosts from "./pages/CategoryPosts/CategoryPosts";
import PostsWrapper from "./components/PostsWrapper";
import useGetAxios from "./hooks/useGetAxios";
import { authSliceActions } from "./store/auth-slice";

function App() {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const myInfo = useGetAxios(`users/me`);
  const dispatch = useDispatch();
  dispatch(authSliceActions.getUserMainInfos(myInfo));

  return (
    <>
      {!token ? (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Dashboard myInfo={myInfo} />
          <Routes>
            <Route element={<PostsWrapper />}>
              <Route path="" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="posts/popular" element={<Popular />} />
              <Route path="category-posts" element={<CategoryPosts />} />
            </Route>
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/user/:user_id" element={<h1>Salam</h1>} />
          </Routes>
        </Box>
      )}
    </>
  );
}

export default App;
