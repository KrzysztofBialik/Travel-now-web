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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Card } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SimpleNavbar } from '../../components/navbars/SimpleNavbar';
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';

export const URL = '/login';
export const NAME = "Login";

export const LoginPage = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const defaultInputValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Email is not valid")
            .required("You have to provide email"),
        password: Yup
            .string()
            .required("Password is required")
            .matches("^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z-0-9]{6,}$",
                "Incorrect password or email address")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const handleLogin = (values) => {
        console.log(values);
        console.log(getValues());
        reset();
        navigate("/dashboard");
    };

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{
            position: "relative",
            height: "100%",
            minWidth: "600px"
        }}
        >
            <SimpleNavbar />
            <Box
                sx={{
                    width: "100%",
                    minWidth: '450px',
                    height: "100%",
                    marginTop: 10,
                    display: 'flex',
                    overflow: "visible",
                    flexDirection: 'row',
                    justifyContent: "center"
                }}
            >
                <Card
                    sx={{
                        marginTop: 10,
                        overflow: "visible",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        overflowWrap: "break-word",
                        backgroundClip: "border-box",
                        width: "100%",
                        minWidth: '400px',
                        maxWidth: '500px',
                        height: "100%",
                        borderRadius: "10px",
                    }}
                    elevation={2}
                >
                    <Box
                        sx={{
                            mx: 2,
                            mt: -3,
                            py: 1,
                            px: 2,
                            // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                            backgroundColor: "primary.main",
                            color: "#000000",
                            borderRadius: "0.5rem",
                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                            Sign in
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockIcon sx={{ color: "primary.main" }} />
                        </Avatar>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 2,
                        pt: "20px",
                        px: '50px',
                        pb: "50px",
                        minHeight: "200px"
                    }}>
                        <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
                            <form onSubmit={handleSubmit(handleLogin)} >
                                <TextField
                                    type='string'
                                    autoFocus
                                    margin="normal"
                                    placeholder='Email'
                                    name='email'
                                    label='Email'
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon sx={{ color: "primary.main" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                                <TextField
                                    type={showPassword ? 'string' : 'password'}
                                    margin="normal"
                                    placeholder='Password'
                                    name='password'
                                    label='Password'
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon sx={{ color: "primary.main" }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    {...register('password')}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                                <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 3, mb: 2, borderRadius: "10px", width: "150px", color: "#FFFFFF"
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </form>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Box>
            {/* <Box
                sx={{
                    width: "100%",
                    minWidth: '450px',
                    height: "100%",
                    marginTop: 10,
                    display: 'flex',
                    overflow: "visible",
                    flexDirection: 'row',
                    justifyContent: "center"
                }}
            >
                <Card
                    sx={{
                        width: "90%",
                        minWidth: '400px',
                        maxWidth: '500px',
                        padding: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center",
                        borderRadius: '20px',
                    }}
                    elevation={2}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockIcon sx={{ color: "primary.main" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="primary.main">
                        Sign up
                    </Typography>
                    <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
                        <form onSubmit={handleSubmit(handleLogin)} >
                            <TextField
                                type='string'
                                autoFocus
                                margin="normal"
                                placeholder='Email'
                                name='email'
                                label='Email'
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon sx={{ color: "primary.main" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                type={showPassword ? 'string' : 'password'}
                                margin="normal"
                                placeholder='Password'
                                name='password'
                                label='Password'
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "primary.main" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3, mb: 2, borderRadius: "10px", width: "150px", color: "#FFFFFF"
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </form>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box > */}
        </Box>
    );
}