import { Box, Tab, Tabs } from "@mui/material";
import CreatePost from "./CreatePost";
import Community from "./Community";
import PropTypes from "prop-types";
import { useState } from "react";
import MyPosts from "./MyPosts";
import { useSelector } from "react-redux";
import CreateCommunity from "./CreateCommunity";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileComponent = () => {
  const myPosts = useSelector((state) => state.authReducer.userMainInfos);
  const loginedUserId = JSON.parse(localStorage.getItem("userInfo"))?.user_id;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {myPosts?.user?.id === loginedUserId && (
        <Box className="prof-create" display="flex" gap="10px">
          <CreatePost />
          <CreateCommunity />
        </Box>
      )}
      <Box sx={{ width: "100%", my: 2 }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            className="tabs-ul"
            aria-label="basic tabs example"
          >
            <Tab
              label="Postlar"
              {...a11yProps(0)}
              className={value === 0 ? "active tab-li" : "tab-li"}
            />
            <Tab
              label="Bəyənilənlər"
              {...a11yProps(1)}
              className={value === 1 ? "active tab-li" : "tab-li"}
            />
            <Tab
              label="Communitilər"
              {...a11yProps(2)}
              className={value === 2 ? "active tab-li" : "tab-li"}
            />
            <Tab
              label="Linklər"
              {...a11yProps(3)}
              className={value === 3 ? "active tab-li" : "tab-li"}
            />
            <Tab
              label="Mesajlar"
              {...a11yProps(4)}
              className={value === 4 ? "active tab-li" : "tab-li"}
            />
            <Tab
              label="Saxlanılanlar"
              {...a11yProps(5)}
              className={value === 5 ? "active tab-li" : "tab-li"}
            />
          </Tabs>
        </Box>
        <CustomTabPanel
          value={value}
          index={0}
          className="profile-posts-tabpanel"
        >
          <MyPosts myPosts={myPosts} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Community />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Item Three
        </CustomTabPanel>
      </Box>
    </>
  );
};

ProfileComponent.propTypes = {
  myPosts: PropTypes.array.isRequired,
};

export default ProfileComponent;
