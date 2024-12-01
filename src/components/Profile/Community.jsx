import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import useGetAxios from "../../hooks/useGetAxios";
import { getTimeElapsed } from "../Helpers/Utility";
import axios from "axios";
import { useSelector } from "react-redux";

const Community = () => {
  const communities = useGetAxios("communities");
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const handleJoinCommunity = (id) => {
    console.log(id);
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
        console.log("Community joined successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error joining community:",
          error.response ? error.response.data : error.message
        );
      });
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      {communities?.map((item) => (
        <>
          <ListItem alignItems="flex-start">
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
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <b>Community Title: {item.title}</b>
                <i>{getTimeElapsed(item.cdate)}</i>
                <Button
                  onClick={() => handleJoinCommunity(item.id)}
                  variant="contained"
                >
                  Qatıl
                </Button>
              </Box>
              <p>Community Desc: {item.description}</p>
            </Box>
          </ListItem>
          <hr />
        </>
      ))}
    </Box>
  );
};

export default Community;
