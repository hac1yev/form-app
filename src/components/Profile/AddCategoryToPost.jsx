import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import useGetAxios from "../../hooks/useGetAxios";

const AddCategoryToPost = ({
  setSelectedCategory,
  selectedCategory,
  communityModal,
}) => {
  let categoryNames;
  const [open, setOpen] = useState(false);
  if (communityModal === false) {
    categoryNames = useGetAxios("communities");
  } else if (communityModal === undefined) {
    categoryNames = useGetAxios("categories");
  }

  console.log("🚀 ~ AddCategoryToPost ~ categoryNames:", communityModal);

  const handleChange = (event) => {
    console.log("🚀 ~ handleChange ~ event:", event.target);
    setSelectedCategory(event.target.value);
    setOpen(false);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", margin: "40px 0 10px 0" }}>
        <InputLabel id="demo-controlled-open-select-label">
          Category Name
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={selectedCategory}
          onChange={handleChange}
          label="Category Name"
        >
          {categoryNames?.map((nameObj) => (
            <MenuItem key={nameObj?.id} value={nameObj?.id}>
              {nameObj?.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

AddCategoryToPost.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default AddCategoryToPost;
