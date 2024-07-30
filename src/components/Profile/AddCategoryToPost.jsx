import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAxios } from "../../api/getRequests";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const AddCategoryToPost = ({ setSelectedCategory,selectedCategory }) => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [categoryNames, setCategoryNames] = useState([]);
  const [open,setOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setOpen(false);    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAxios(
          "http://195.35.56.202:8080/category",
          token
        );
        setCategoryNames(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

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