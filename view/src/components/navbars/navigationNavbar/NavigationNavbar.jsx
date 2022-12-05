import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useEffect } from "react";

import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import './NavigationNavbar.css';
import { MenuItems } from './MenuItems'
import { UserOptionsDialog } from '../../navbarDialogs/UserOptionsDialog';
import { TripGroupOptionsDialog } from '../../navbarDialogs/TripGroupOptionsDialog';
import { ConfirmLogoutDialog } from './ConfirmLogoutDialog';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { doGet } from '../../utils/fetch-utils'


export const NavigationNavbar = ({ buttonsData, groupId }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElGroup, setAnchorElGroup] = React.useState(null);
    const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
    const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
    const [tripGroupOptionsDialogOpen, setTripGroupOptionsDialogOpen] = useState(false);
    const [userOptionsDialogOpen, setUserOptionsDialogOpen] = useState(false);
    const [userLogoutDialogOpen, setUserLogoutDialogOpen] = useState(false);
    const [isCoordinator, setIsCoordinator] = useState(false)
    const navigate = useNavigate();


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenGroupMenu = (event) => {
        setAnchorElGroup(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseGroupMenu = () => {
        setAnchorElGroup(null);
    };

    const handleTripGroupOptionsAction = () => {
        setAnchorElGroup(null);
        setTripGroupOptionsDialogOpen(true);
    };

    const handleLeaveGroup = () => {
        setAnchorElGroup(null);
        setLeaveGroupDialogOpen(true);
    };

    const handleDeleteGroup = () => {
        setAnchorElGroup(null);
        setDeleteGroupDialogOpen(true);
    };

    const handleUserOptionsAction = () => {
        setAnchorElUser(null);
        setUserOptionsDialogOpen(true);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        setUserLogoutDialogOpen(true);
    };

    const logoutAction = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("userId");
        navigate('/');
    }

    const removeMenus = () => {
        setAnchorElGroup(null);
        setAnchorElUser(null);
    };

    const handleLogutDialogClose = () => {
        setUserLogoutDialogOpen(false)
    }

    const getIsCoordinator = async () => {
        await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
        .then(response => setIsCoordinator(response.json))
        .catch(err => console.log(err.message));
    };

    useEffect(() => {
        getIsCoordinator();
      }, [])




    window.addEventListener('scroll', removeMenus);

    function dropdownMenus(buttonsData) {
        const buttons = [];

        for (var i = 0; i < buttonsData.length; i++) {
            buttons.push(
                <>
                    <Button
                        key={buttonsData[i].id}
                        variant="contained"
                        sx={{ width: "150px" }}
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
            )
        }
        return buttons;
    }

    return (
        <>
         <ConfirmLogoutDialog
         open={userLogoutDialogOpen}
         onClose={() => setUserLogoutDialogOpen(false)}
         logoutAction={logoutAction}
         />
            <TripGroupOptionsDialog
                open={tripGroupOptionsDialogOpen}
                onClose={() => setTripGroupOptionsDialogOpen(false)}
            />
            <UserOptionsDialog
                open={userOptionsDialogOpen}
                onClose={() => setUserOptionsDialogOpen(false)}
            />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    sx={{
                        width: "100%",
                        minWidth: "1000px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        position: "relative",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mx: 2
                        }}>
                        <Typography variant="h6" color="#FFFFFF" >
                            <Link to="/dashboard" className="logo">
                                Travel-now
                            </Link>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                gap: "50px"
                            }}>
                            {buttonsData.map((button, index) => {
                                return (
                                    <MenuItems items={button} key={index} />
                                )
                            })}
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            {buttonsData.length !== 0 &&
                                <Box sx={{ flexGrow: 0, mr: 2 }}>
                                    <Tooltip title="Open trip group settings">
                                        <IconButton
                                            onClick={handleOpenGroupMenu}
                                            sx={{
                                                p: 0,
                                            }}>
                                            <SettingsIcon
                                                sx={{
                                                    color: "#FFFFFF",
                                                    fontSize: "36px",
                                                    "&:hover": {
                                                        color: "primary.dark"
                                                    }
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElGroup}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        disableScrollLock={true}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElGroup)}
                                        onClose={handleCloseGroupMenu}
                                    >
                                        {isCoordinator ?
                                            <>
                                                <MenuItem
                                                    onClick={handleTripGroupOptionsAction}
                                                >
                                                    <SettingsIcon sx={{ color: "primary.dark", mr: 1 }} />
                                                    <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                                        Trip group settings
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleDeleteGroup}
                                                >
                                                    <DeleteIcon sx={{ color: "error.main", mr: 1 }} />
                                                    <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                                        Delete group
                                                    </Typography>
                                                </MenuItem>
                                            </>
                                            :
                                            <MenuItem
                                                onClick={handleLeaveGroup}
                                            >
                                                <ExitToAppIcon sx={{ color: "primary.dark", mr: 1 }} />
                                                <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                                    Leave group
                                                </Typography>
                                            </MenuItem>
                                        }
                                    </Menu>
                                </Box>
                            }
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open user settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                            p: 0
                                        }}
                                    >
                                        <AccountCircleIcon
                                            sx={{
                                                color: "#FFFFFF",
                                                fontSize: "36px",
                                                "&:hover": {
                                                    color: "primary.dark"
                                                }
                                            }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    disableScrollLock={true}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        onClick={handleUserOptionsAction}
                                    >
                                        <SettingsIcon sx={{ color: "primary.dark", mr: 1 }} />
                                        <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                            Account settings
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleLogout()}
                                    >
                                        <LogoutIcon sx={{ color: "primary.dark", mr: 1 }} />
                                        <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};