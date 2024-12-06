import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { getTimeElapsed } from "../Helpers/Utility";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/auth-slice";
import { useEffect } from "react";

const Community = () => {
  const communities = useSelector(
    (state) => state.authReducer.allCommunities.data
  );
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCommunities = async () => {
      try {
        const response = await axios.get(
          "https://sorblive.com:8080/communities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(authSliceActions.getAllCommunities(response));
      } catch (error) {
        console.log(error);
      }
    };

    getAllCommunities();
  }, []);

  // const getPersonalCommunities = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://sorblive.com:8080/user-communities",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     dispatch(authSliceActions.getUserCommunties(response));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleJoinCommunity = (id) => {
    axios
      .post(
        "https://sorblive.com:8080/join-community",
        {
          community_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(authSliceActions.addPersonalCummunites(id));
        // getPersonalCommunities();
        return response;
      })
      .catch((error) => {
        console.error(
          "Error joining community:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleDeleteCommunity = (id) => {
    axios
      .delete("https://sorblive.com:8080/community", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          community_id: id,
        },
      })
      .then((response) => {
        dispatch(authSliceActions.deleteCommunity(id));
        return response;
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
      });
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      {communities?.map((item) => (
        <>
          <ListItem className="prof-create" alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`https://sorblive.com:8080/${item.picture}`}
              />
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              ></Typography>
            </ListItemAvatar>
            <Box width="100%">
              <Box
                className="prof-create"
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap='5px'
              >
                <b style={{ flexGrow: "1", textWrap: "wrap" }}>
                  Title: {item.title}
                </b>
                <i style={{ flexGrow: "1" }}>{getTimeElapsed(item.cdate)}</i>
                <Button
                  onClick={() => handleDeleteCommunity(item.id)}
                  variant="contained"
                  color="error"
                >
                  Sil
                </Button>
                <Button
                  onClick={() => handleJoinCommunity(item.id)}
                  variant="contained"
                >
                  Qatıl
                </Button>
              </Box>
              <p>Desc: {item.description}</p>
            </Box>
          </ListItem>
          <hr />
        </>
      ))}
    </Box>
  );
};

export default Community;
