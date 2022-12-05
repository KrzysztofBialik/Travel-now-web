import { useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { currentTripButtonsDataWithGroupId, futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";

import { ParticipantsTable } from "../../components/participants/ParticipantsTable";
import { InviteDialog } from "../../components/participants/InviteDialog";
import { doGet } from "../../components/utils/fetch-utils";

export const URL = '/participants/:groupId';
export const NAME = "Participants";

export const ParticipantsPage = () => {
    
    const {groupId} = useParams();

    const [groupStage, setGroupStage] = useState([]);

    const [isCoordinator, setIsCoordinator] = useState([]);

    const getGroupData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(response => setGroupStage(response.groupStage))
        .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId")}).toString())
        .then(response => response.json())
        .then(response => setIsCoordinator(response))
        .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {
        getGroupData();
      }, [])


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
                buttonsData={groupStage === "PLANNING_STAGE" ? futureTripButtonsDataWithGroupId(groupId) : currentTripButtonsDataWithGroupId(groupId)}
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
                            {(groupStage === "PLANNING_STAGE" && isCoordinator) &&
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10, color: "#FFFFFF", width: "120px" }}
                                    onClick={inviteAction}
                                >
                                    Invite
                                    <PersonAddIcon sx={{ ml: 2 }} />
                                </Button>}
                        </>
                    </Box>
                    <ParticipantsTable groupStage={groupStage} isCoordinator={isCoordinator} groupId={groupId} />
                </Box>
            </Box >
        </Box >
    );
}
