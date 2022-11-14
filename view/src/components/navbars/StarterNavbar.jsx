import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import './StarterNavbar.css';


export const StarterNavbar = () => {
    const [color, setColor] = useState(false);
    console.log(color);
    const changeColor = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 90) {
            setColor(true)
        }
        else {
            setColor(false)
        }
    }

    window.addEventListener('scroll', changeColor);

    return (
        <StyledEngineProvider injectFirst>
            <Box className={color ? 'header header-bg' : 'header'}>
                <Box className='navbar'>
                    <Box className='left-items'>
                        <Typography variant="h4">
                            Travel-now
                        </Typography>
                    </Box>
                    <Box className='right-items'>
                        <Box className='nav-button-div'>
                            <Button href="/register" className='nav-button'>
                                Register
                            </Button>
                        </Box>
                        <Box className='nav-button-div'>
                            <Button href="/login" className='nav-button'>
                                Sign in
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <div className='wrapper'></div>
        </StyledEngineProvider>
    );
};