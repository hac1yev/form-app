import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const PasswordInput = ({ password, handlePassword }) => {
  const [showPassword, setShowPassword] = useState(false);  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size="medium"
      margin="dense"
      required
      fullWidth
      name="password"
      id="password"
      label="Şifrə"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={handlePassword}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordInput.propTypes = {
    password: PropTypes.string.isRequired,
    handlePassword: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default PasswordInput;