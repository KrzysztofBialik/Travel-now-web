// // import { doGet, doPost } from "../../utils/fetch-utils";
// import { LoginForm } from "../../components/login/LoginForm";
// // import { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
// import { Container } from '@mui/material';

// export const URL = '/login';
// export const NAME = "Login";

// export const LoginPage = ({ setUser }) => {
//     // const [loggingIn, setLoggingIn] = useState(true)

//     // useEffect(() => {
//     //     if (localStorage.getItem("ACCESS_TOKEN") !== null) {
//     //         doGet("/api/users/me")
//     //             .then(response => response.json())
//     //             .then(userInfo => {
//     //                 setUser({
//     //                     authenticated: true,
//     //                     currentUser: userInfo
//     //                 })
//     //             })
//     //             .catch(error => console.error(error))
//     //     } else {
//     //         setLoggingIn(false)
//     //     }

//     //     return () => {
//     //         setLoggingIn(false)
//     //     }
//     // }, [setUser])

//     // const signIn = (email, password) => {
//     //     const body = {
//     //         email: email,
//     //         password: password,
//     //     }

//     //     doPost("/api/auth/login", body, false)
//     //         .then(response => {
//     //             const jwt = response.headers.get("Authorization")
//     //             localStorage.setItem("ACCESS_TOKEN", jwt)
//     //             return response.json()
//     //         })
//     //         .then(userInfo => {
//     //             setUser({
//     //                 authenticated: true,
//     //                 currentUser: userInfo
//     //             });
//     //         })
//     //         .catch(error => console.error(error))
//     // }

//     // if (loggingIn) {
//     //     return null;
//     // }

//     return (
//         <Container>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <LoginForm />
//             </Box>
//         </Container>
//     )
// }

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card } from '@mui/material';

import { SimpleNavbar } from '../../components/navbars/SimpleNavbar';
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const URL = '/login';
export const NAME = "Login";

export const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box sx={{
            position: "relative",
            height: "100%",
            minWidth: "600px"
        }}
        >
            {/* <SimpleNavbar /> */}
            <NavigationNavbar buttonsData={[]} />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card
                        sx={{
                            margin: '50px',
                            minWidth: '500px',
                            padding: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: '20px',
                        }}
                        elevation={8}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="emailLogin"
                                label="Email Address or Login"
                                name="emailLogin"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                href="/dashboard"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </Box>
    );
}