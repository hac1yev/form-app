import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import useGetAxios from "../../hooks/useGetAxios";

const AddCategoryToPost = ({ setSelectedCategory,selectedCategory }) => {
  const [open,setOpen] = useState(false);
  const categoryNames = useGetAxios("category")

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setOpen(false);    
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-controlled-open-select-label">Category Name</InputLabel>
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
          {categoryNames.map((nameObj) => (
            <MenuItem key={nameObj?.id} value={nameObj?.id}>
                {nameObj?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

AddCategoryToPost.propTypes = {
    setSelectedCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired
}

export default AddCategoryToPost;