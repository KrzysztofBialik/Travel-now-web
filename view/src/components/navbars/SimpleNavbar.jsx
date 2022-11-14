import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const SimpleNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1, minWidth: "1200px" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Travel-now
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};