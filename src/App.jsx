import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import axios from "axios";
import { loadingSliceActions } from "./store/loading-slice";
import { authSliceActions } from "./store/auth-slice";

function App() {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    async function getUserInfo(endpoint) {
      const response = await axios.get(`https://sorblive.com:8080/${endpoint}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
      });
      
      return response;
    }

    (async function fetchData() {
        dispatch(loadingSliceActions.isItLoading(true));
        try {
          if(pathname.includes('/user')) {
            let postId = pathname.split("/").at(-1);
            const response = await getUserInfo(`users/${postId}`);            
            dispatch(authSliceActions.getUserMainInfos(response.data));
          }else{
            const response = await getUserInfo("users/me")          
            dispatch(authSliceActions.getUserMainInfos(response.data));
          }
        } catch (error) {
          console.log(error);
        }
        dispatch(loadingSliceActions.isItLoading(false));
      })();
}, [dispatch,token,pathname]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Routes>
          <Route element={<PostsWrapper />}>
            <Route path="" element={<Popular />} />
            <Route path="search" element={<Search />} />
            <Route path="/special" element={<Home />} />
            <Route path="community/:category_id" element={<CategoryPosts />} />
          </Route>
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/user/:user_id" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
