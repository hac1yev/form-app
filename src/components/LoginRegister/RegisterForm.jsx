import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import dipnot_logo from "../../assets/dipnote-logo.svg";
import google from '../../assets/google.svg';
import apple from '../../assets/apple.svg';
import facebook from '../../assets/facebook.svg';
import { Grid, IconButton, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import PasswordInput from './PasswordInput';
import axios from 'axios';

const RegisterForm = () => {
    const isLarge = useMediaQuery("(max-width:899.5px)");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formData = {
            email: data.get("email"),
            username: data.get("username"),
            last_name: data.get("lastName"),
            first_name: data.get("firstName"),
            get_email: true,
            password,
        };

        try {
            const response = await axios.post(
              "http://195.35.56.202:8080/register",
              formData,
            //   {
            //     mode: "no-cors",
            //   }
            );
            navigate("/signin");
            return response;
          } catch (error) {
            console.error("Registration failed!", error);
          }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };    

    return (
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }} maxWidth="xs">
            <Box
                component="img"
                sx={{
                    width: 193,
                    height: 43,
                }}
                alt="The house from the offer."
                src={dipnot_logo}
            />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3">
                    Qeydiyyatdan keçin
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1, mt: 1 }}>
                    Qeydiyyatdan keçmək üçün aşağıdakı məlumatları daxil edin
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                    <Grid container spacing={!isLarge ? 1 : 0}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="firstName"
                                label="Adı"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="lastName"
                                label="Soyadı"
                                name="lastName"
                                autoComplete="lastName"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="username"
                        label="İstifadəçi adı"
                        name="username"
                        autoComplete="username"
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                    <PasswordInput password={password} handlePassword={handlePassword} />
                    <Button
                        className='register-button'
                        size='large'
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                    >
                        Daxil ol
                    </Button>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Link to="/login" variant="body2" style={{ textDecoration: 'none', color: 'rgba(5, 104, 214, 1)' }}>
                            Hesabınız var? Giriş
                        </Link>
                    </Box>
                    <Box className="space-between" sx={{ gap: '8px', my: 1 }}>
                        <Box component="span" sx={{ flex: 1, width: '100%', height: '1px', display: 'block', bgcolor: 'rgba(130, 130, 130, 0.2)' }}></Box>
                        <Box component="span" sx={{ color: 'rgba(130, 130, 130, 1)' }}>və ya daxil ol</Box>
                        <Box component="span" sx={{ flex: 1, width: '100%', height: '1px', display: 'block', bgcolor: 'rgba(130, 130, 130, 0.2)' }}></Box>
                    </Box>
                    <Box className="space-between" sx={{ gap: '10px', mt: 2 }}>
                        <Box className="flex-column" sx={{ width: '100%', height: '50px', border: '1px solid rgba(188, 190, 192, 1)', borderRadius: '10px' }}>
                            <IconButton sx={{ width: '100%', height: '100%', p: 0, borderRadius: '10px' }}>
                                <Box component="img" src={google} />
                            </IconButton>
                        </Box>
                        <Box className="flex-column" sx={{ width: '100%', height: '50px', border: '1px solid rgba(188, 190, 192, 1)', borderRadius: '10px' }}>
                            <IconButton sx={{ width: '100%', height: '100%', p: 0, borderRadius: '10px' }}>
                                <Box component="img" src={apple} />
                            </IconButton>
                        </Box>
                        <Box className="flex-column" sx={{ width: '100%', height: '50px', border: '1px solid rgba(188, 190, 192, 1)', borderRadius: '10px' }}>
                            <IconButton sx={{ width: '100%', height: '100%', p: 0, borderRadius: '10px' }}>
                                <Box component="img" src={facebook} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Typography variant='subtitle1' sx={{ textAlign: 'center', mt: 3 }}>
                        Davam et düyməsini klikləməklə, <b>Xidmət Şərtlərimiz</b> və <b>Məxfilik Siyasətimizlə</b> razılaşırsınız
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;