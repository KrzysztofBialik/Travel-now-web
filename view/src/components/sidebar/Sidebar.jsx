import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, List, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { DesktopDrawer } from "./DesktopDrawer";
import { MobileDrawer } from "./MobileDrawer";
import { useTheme } from '@emotion/react';
import { isMobile } from 'react-device-detect';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export const Sidebar = ({ isOpen, setIsOpen }) => {
    const theme = useTheme();
    // const isMobile = window.matchMedia(`(max-width: 720px)`).matches;
    // const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const Drawer = isMobile ? MobileDrawer : DesktopDrawer

    return (
        <Drawer variant="permanent" isOpen={isOpen} setIsOpen={setIsOpen}>
            <DrawerHeader>
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: isOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: isOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
