import { useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { futureTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { currentTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";

import { ParticipantsTable } from "../../components/participants/ParticipantsTable";
import { InviteDialog } from "../../components/participants/InviteDialog";

export const URL = '/participants';
export const NAME = "Participants";

export const ParticipantsPage = () => {

    const groupStage = 1;
    const isCoordinator = true;

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

    const inviteAction = () => {
        setInviteDialogOpen(true);
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%'
            }}>
            <NavigationNavbar
                buttonsData={groupStage === 1 ? futureTripButtonsData : currentTripButtonsData}
            />
            <InviteDialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)} />
            <Box sx={{
                pt: 10,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                minWidth: "100%",
                height: "100%",
                margin: 0
            }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "90%",
                        height: "100%"
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: 'center',
                        width: "100%",
                        mb: "50px",
                    }}>
                        {(groupStage === 1 && isCoordinator) ?
                            <>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        width: "90%"
                                    }}
                                >
                                    Participants
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10, color: "#FFFFFF", width: "120px" }}
                                    onClick={inviteAction}
                                >
                                    Invite
                                    <PersonAddIcon sx={{ ml: 2 }} />
                                </Button></>
                            :
                            <Typography
                                variant="h3"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    width: "100%"
                                }}
                            >
                                Participants
                            </Typography>
                        }
                    </Box>
                    <ParticipantsTable groupStage={groupStage} isCoordinator={isCoordinator} />
                </Box>
            </Box >
        </Box >
    );
}
