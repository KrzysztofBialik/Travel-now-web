import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { URL_PREFIX } from "../../utils/fetch-utils"
import '../app/App.css';

export const LoginForm = ({ onSignIn }) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const submit = () => {
        onSignIn(emailInput, passwordInput)
        setEmailInput('');
        setPasswordInput('');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar
                    variant="circular"
                    sx={{ height: "64px", width: "64px", m: 1, color: 'black' }}>
                    <PersonIcon sx={{ fontSize: "48px" }} fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ color: "#555555" }}>
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        type="text"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <Button
                        onClick={() => submit()}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "black", mt: 1, mb: 2,
                            '&:hover': {
                                backgroundColor: "black",
                            }
                        }}
                        startIcon={<GitHubIcon />}
                    // href={`${URL_PREFIX}/oauth2/authorization/github`}
                    >
                        Login with GitHub
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}