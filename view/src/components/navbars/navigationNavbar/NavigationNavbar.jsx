import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useState } from "react";
import { useEffect } from "react";
import { MenuItems } from './MenuItems';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserOptionsDialog } from '../../navbarDialogs/UserOptionsDialog';
import { TripGroupOptionsDialog } from '../../navbarDialogs/TripGroupOptionsDialog';
import { ConfirmLogoutDialog } from '../../navbarDialogs/ConfirmLogoutDialog';
import { ConfirmLeaveGroupDialog } from '../../navbarDialogs/ConfirmLeaveGroupDialog';
import { ConfirmDeleteGroupDialog } from '../../navbarDialogs/DeleteGroupDialog';
import { doGet } from '../../utils/fetch-utils';
import './NavigationNavbar.css';


export const NavigationNavbar = ({ buttonsData, groupId }) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElGroup, setAnchorElGroup] = React.useState(null);
    const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
    const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
    const [tripGroupOptionsDialogOpen, setTripGroupOptionsDialogOpen] = useState(false);
    const [userOptionsDialogOpen, setUserOptionsDialogOpen] = useState(false);
    const [userLogoutDialogOpen, setUserLogoutDialogOpen] = useState(false);
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [isPlanningStage, setIsPlanningStage] = useState(false);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (groupId) {
            getIsCoordinator();
            getTripData();
        }
        getUserData();
    }, []);

    const getUserData = async () => {
        await doGet('/api/v1/user?' + new URLSearchParams({ userId: sessionStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => {
                setNecessaryData(response);
            })
            .catch(err => console.log('Request Failed', err));
    };

    const setNecessaryData = (response) => {
        const allPhoneNumber = response.phoneNumber.split(" ");
        var code = allPhoneNumber[0].slice();
        code = code.slice(1, code.length)
        const phoneNumber = allPhoneNumber[1];
        setUserData({
            userId: response.userId, email: response.email, firstName: response.firstName, surname: response.surname,
            code: code, phone: phoneNumber, birthDate: response.birthday
        });
    };

    const getIsCoordinator = async () => {
        await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => setIsCoordinator(response))
            .catch(err => console.log(err.message));
    };

    const getTripData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setIsPlanningStage(response.groupStage === "PLANNING_STAGE");
            })
            .catch(err => console.log('Request Failed', err));
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
        sessionStorage.removeItem("ACCESS_TOKEN");
        sessionStorage.removeItem("userId");
        navigate('/');
    };

    const removeMenus = () => {
        setAnchorElGroup(null);
        setAnchorElUser(null);
    };

    window.addEventListener('scroll', removeMenus);

    return (
        <>
            <ConfirmDeleteGroupDialog
                open={deleteGroupDialogOpen}
                onClose={() => setDeleteGroupDialogOpen(false)}
                groupId={groupId}
            />
            <ConfirmLeaveGroupDialog
                open={leaveGroupDialogOpen}
                onClose={() => setLeaveGroupDialogOpen(false)}
                groupId={groupId}
            />
            <ConfirmLogoutDialog
                open={userLogoutDialogOpen}
                onClose={() => setUserLogoutDialogOpen(false)}
                logoutAction={logoutAction}
            />
            <TripGroupOptionsDialog
                open={tripGroupOptionsDialogOpen}
                onClose={() => setTripGroupOptionsDialogOpen(false)}
                groupId={groupId}
            />
            {userOptionsDialogOpen && <UserOptionsDialog
                open
                onClose={() => setUserOptionsDialogOpen(false)}
                userData={userData}
            />
            }
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    sx={{
                        width: "100%",
                        minWidth: "1200px",
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
                                    <Tooltip title="Open trip group menu">
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
                                            [
                                                <MenuItem
                                                    key={1}
                                                    onClick={handleTripGroupOptionsAction}
                                                >
                                                    <SettingsIcon sx={{ color: "primary.dark", mr: 1 }} />
                                                    <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                                        Trip group settings
                                                    </Typography>
                                                </MenuItem>,
                                                <MenuItem
                                                    key={2}
                                                    onClick={handleLeaveGroup}
                                                >
                                                    <ExitToAppIcon sx={{ color: "error.main", mr: 1 }} />
                                                    <Typography sx={{ textAlign: "center", color: "error.main" }}>
                                                        Leave group
                                                    </Typography>
                                                </MenuItem>,
                                                <MenuItem
                                                    key={3}
                                                    onClick={handleDeleteGroup}
                                                >
                                                    <DeleteIcon sx={{ color: "error.main", mr: 1 }} />
                                                    <Typography sx={{ textAlign: "center", color: "error.main" }}>
                                                        Delete group
                                                    </Typography>
                                                </MenuItem>
                                            ]
                                            :
                                            [<MenuItem
                                                key={1}
                                                onClick={handleLeaveGroup}
                                            >
                                                <ExitToAppIcon sx={{ color: "error.main", mr: 1 }} />
                                                <Typography sx={{ textAlign: "center", color: "error.main" }}>
                                                    Leave group
                                                </Typography>
                                            </MenuItem>
                                            ]
                                        }
                                    </Menu>
                                </Box>
                            }
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open user menu">
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
                                        key={1}
                                        onClick={handleUserOptionsAction}
                                    >
                                        <SettingsIcon sx={{ color: "primary.dark", mr: 1 }} />
                                        <Typography sx={{ textAlign: "center", color: "primary.dark" }}>
                                            Account settings
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        key={2}
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