import { Grid } from '@mui/material';
import LoginRegisterLeftSide from '../../components/LoginRegister/LoginRegisterLeftSide';
import './Register.scss';
import RegisterForm from '../../components/LoginRegister/RegisterForm';

const Register = () => {
  return (
    <Grid container>
      <Grid item md={6} className='logregleft'>
          <LoginRegisterLeftSide />
      </Grid>
      <Grid item xs={12} md={6}>
          <RegisterForm />
      </Grid>                                                                             
    </Grid>
  )
}

export default Register