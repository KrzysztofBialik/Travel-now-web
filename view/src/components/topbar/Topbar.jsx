import * as React from 'react';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { MobileAppBar } from "./MobileAppBar";
import { DesktopAppBar } from "./DesktopAppBar";
import { useTheme } from '@emotion/react';
import { isMobile } from 'react-device-detect';


export const Topbar = ({ isOpen, setIsOpen }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    // const isMobile = window.matchMedia(`(max-width: 720px)`).matches;

    const AppBar = isMobile ? MobileAppBar : DesktopAppBar;

    return (
        <AppBar position="fixed" isOpen={isOpen} sx={{ boxShadow: 'none' }}>
            <Toolbar >
                <IconButton
                    color='secondaryTransparent'
                    aria-label="open drawer"
                    onClick={() => setIsOpen(!isOpen)}
                    edge="start"
                    sx={{ marginRight: "36px", ...(!matches && isOpen && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap component="h1"
                    sx={{ flexGrow: 1 }}
                >
                    Mini variant drawer
                </Typography>
            </Toolbar>
        </AppBar>
    )
}