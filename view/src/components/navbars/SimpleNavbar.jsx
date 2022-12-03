import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const SimpleNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1, minWidth: "1200px" }}>
            <AppBar sx={{ borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", position: "static" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ ml: "50px", color: "#FFFFFF" }}>
                        Travel-now
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};