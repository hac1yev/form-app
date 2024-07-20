import { Grid } from '@mui/material';
import LoginRegisterLeftSide from '../../components/LoginRegister/LoginRegisterLeftSide';
import LoginForm from '../../components/LoginRegister/LoginForm';
import './Login.scss';

const Login = () => {
    return (
        <Grid container>
            <Grid item md={6} className='logregleft'>
                <LoginRegisterLeftSide />
            </Grid>
            <Grid item xs={12} md={6}>
                <LoginForm />
            </Grid>                                                                             
        </Grid>
    );
};

export default Login;