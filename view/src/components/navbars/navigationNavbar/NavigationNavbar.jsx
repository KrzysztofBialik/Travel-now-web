// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import SettingsIcon from '@mui/icons-material/Settings';

// const pages = ['Availability', 'Accomodation', 'Participants'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// export const NavigationNavbar = () => {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <AppBar position="static">
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Typography
//                         variant="h5"
//                         noWrap
//                         component="a"
//                         href="/"
//                         sx={{
//                             mr: 2,
//                             display: { xs: 'none', md: 'flex' },
//                             color: 'inherit',
//                             textDecoration: 'none',
//                         }}
//                     >
//                         Travel-now
//                     </Typography>

//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="account of current user"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'left',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{
//                                 display: { xs: 'block', md: 'none' },
//                             }}
//                         >
//                             {pages.map((page) => (
//                                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                     <Typography textAlign="center">{page}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                     <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//                     <Typography
//                         variant="h5"
//                         noWrap
//                         component="a"
//                         href=""
//                         sx={{
//                             mr: 2,
//                             display: { xs: 'flex', md: 'none' },
//                             flexGrow: 1,
//                             fontFamily: 'monospace',
//                             fontWeight: 700,
//                             letterSpacing: '.3rem',
//                             color: 'inherit',
//                             textDecoration: 'none',
//                         }}
//                     >
//                         LOGO
//                     </Typography>
//                     <Box
//                         sx={{
//                             flexGrow: 1,
//                             display: { xs: 'none', md: 'flex' },
//                             justifyContent: "space-evenly",
//                             alignItems: "center",
//                             mx: "10%"
//                         }}
//                     >
//                         {pages.map((page) => (
//                             <Button
//                                 key={page}
//                                 onClick={handleCloseNavMenu}
//                                 color='inherit'
//                                 sx={{ my: 2, backgroundColor: 'black' }}
//                                 variant="outlined"
//                             >
//                                 {page}
//                             </Button>
//                         ))}
//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="Remy Sharp" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                     <Typography textAlign="center">{setting}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// };


import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import './NavigationNavbar.css';
import { MenuItems } from './MenuItems'


export const NavigationNavbar = ({ buttonsData }) => {
    // const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);

    // const handleOptionsMenu = () => {
    //     setOptionsMenuOpen(!optionsMenuOpen);
    // }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function dropdownMenus(buttonsData) {
        const buttons = [];

        for (var i = 0; i < buttonsData.length; i++) {
            buttons.push(
                <>
                    <Button
                        key={buttonsData[i].id}
                        variant="contained"
                        // href={button.link}
                        sx={{ mx: "20px", width: "150px" }}
                        onClick={handleClick}
                    >
                        {buttonsData[i].name}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                    </Menu>
                </>
                // for(var j = 0; j<buttonsData[i].subPages.length; j++) {}
            )
        }
        return buttons;
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{ minWidth: "1200px" }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mx: "5%",
                    }}>
                    <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                        <Typography variant="h6">
                            <Link to="/dashboard" className="logo">
                                Travel-now
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            gap: "50px"
                        }}>
                        {/* {dropdownMenus(buttonsData)} */}
                        {/* <ul className="menus"> */}
                        {buttonsData.map((button, index) => {
                            return (
                                <MenuItems items={button} key={index} />
                            )
                        })}
                        {/* </ul> */}
                        {/* {buttonsData.map(({ id, name, link, subPages }) => (
                            <>
                                <Button
                                    key={id}
                                    variant="contained"
                                    // href={button.link}
                                    sx={{ mx: "20px", width: "150px" }}
                                    onClick={handleClick}
                                >
                                    {name}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                > */}

                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        {/* {buttonsData[1].subPages.map(({ id, name, link }) => (
                                        <MenuItem
                                            key={id}
                                            onClick={handleClose}
                                            href={link}
                                        >
                                            <Button>{name}</Button>
                                        </MenuItem>
                                    ))} */}
                        {/* {buttonsData.flatMap((button) => (button.subPages)).map((subPage) => (
                                        <MenuItem
                                        // key={subPage.name}
                                        >
                                            <Button
                                                onClick={handleClose}
                                                href={subPage.link}
                                                sx={{ height: "100%" }}
                                            >
                                                {subPage.name}
                                            </Button>
                                        </MenuItem>
                                    ))} */}
                        {/* </Menu>
                            </>
                        ))} */}

                        {/* <Button variant="contained"
                            sx={{}}
                        >Availability</Button>
                        <Button variant="contained">Accomodation</Button>
                        <Button variant="contained">Participants</Button> */}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton>
                            <LogoutIcon />
                        </IconButton>
                        {/* -------------------tutaj można dodać logikę do rozwijanego menu z akcjami użytkownika-------------------
                        -------------------zamiast ikony logout, byłby wtedy awatar użytkownika------------------- */}
                        {/* <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOptionsMenu}
                                sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            // anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={optionsMenuOpen}
                        // open={Boolean(anchorElUser)}
                        // onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};