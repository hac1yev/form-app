import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import useGetAxios from "../../hooks/useGetAxios";
import { getTimeElapsed } from "../Helpers/Utility";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/auth-slice";

const Community = () => {
  const communities = useGetAxios("communities");
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const dispatch = useDispatch();
  const getPersonalCommunities = async () => {
    try {
      const response = await axios.get(
        "http://209.38.241.78:8080/user-communities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(authSliceActions.getUserCommunties(response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinCommunity = (id) => {
    axios
      .post(
        "http://209.38.241.78:8080/join-community",
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
        getPersonalCommunities();
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
      .delete(
        "http://209.38.241.78:8080/community",
        { community_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // getPersonalCommunities();
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
                src={`http://209.38.241.78:8080/${item.picture}`}
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
