import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSliceActions } from "../store/loading-slice";
import axios from "axios";

const useGetAxios = (endpoint, refresh) => { 
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchData() {
      dispatch(loadingSliceActions.isItLoading(true));
      try {
        const response = await axios.get(
          `https://sorblive.com:8080/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      dispatch(loadingSliceActions.isItLoading(false));
    })();
  }, [dispatch, endpoint, token, refresh]); // Add refresh to dependencies

  return data;
};

export default useGetAxios;
