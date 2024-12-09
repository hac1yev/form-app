import { Box, Typography } from "@mui/material";
import logreg1 from "../../assets/login-reg1.svg";
import logreg2 from "../../assets/login-reg2.svg";
import "./LoginRegister.scss";

const LoginRegisterLeftSide = () => {
  return (
    <Box className="login-register-left">
      <Box className="log-reg-middle">
        <Typography className="logreg-text">
          Need webdesign for your business? <b>DİPNOTE</b> will help you.
        </Typography>
      </Box>
      <Box
        component={"img"}
        className="logregimg1"
        src={logreg1}
        alt={"logreg1"}
        sx={{ filter: "invert(1)" }}
      />
      <Box
        className="logregimg2"
        component={"img"}
        src={logreg2}
        alt={"logreg2"}
      />
    </Box>
  );
};

export default LoginRegisterLeftSide;
