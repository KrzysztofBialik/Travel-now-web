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
import { ErrorToast } from "../../components/toasts/ErrorToast";

export const URL = '/participants/:groupId';
export const NAME = "Participants";

export const ParticipantsPage = () => {

    const { groupId } = useParams();

    const [groupStage, setGroupStage] = useState([]);

    const [isCoordinator, setIsCoordinator] = useState([]);
    const [inviteLink, setInviteLink] = useState("");
    const [copiedText, setCopiedtext] = useState(inviteLink);
    const [errorToast, setErrorToast] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(errorToast);
    const [creationError, setCreationError] = useState("Ups! Something went wrong. Try again.");

    const getGroupData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setGroupStage(response.groupStage))
            .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => setIsCoordinator(response))
            .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {
        getGroupData();
    }, [])


    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

    const inviteAction = async () => {
        await doGet('/api/v1/invitation?' + new URLSearchParams({ group: groupId }).toString())
            .then(response => {
                if(response.ok) {
                    setInviteLink(response.headers.get('Location').replace('http://localhost:8080/api/v1/invitation/', 'http://localhost:3000/invite'))
                    setCopiedtext(response.headers.get('Location').replace('http://localhost:8080/api/v1/invitation/', 'http://localhost:3000/invite'))
                    setInviteDialogOpen(true);
                }
               
            })
            .catch(err => {
                setErrorToastOpen(true)
                setCreationError(err.message)
            });
        
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%'
            }}>
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} />
            <NavigationNavbar
                buttonsData={groupStage === "PLANNING_STAGE" ? futureTripButtonsDataWithGroupId(groupId) : currentTripButtonsDataWithGroupId(groupId)}
                groupId={groupId}
            />
            <InviteDialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)} groupId={groupId} copiedText={copiedText} inviteLink={inviteLink} />
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
                        flexDirection: "column",
                        // justifyContent: "center",
                        alignItems: 'center',
                        width: "100%",
                        height: "40px",
                        mb: "50px",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: 'center',
                            width: "100%"
                        }}>
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
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: 'center',
                                width: "100%",
                                mt: -6
                            }}
                        >
                            {(groupStage === "PLANNING_STAGE" && isCoordinator) &&
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10, color: "#FFFFFF", width: "120px" }}
                                    onClick={inviteAction}
                                >
                                    Invite
                                    <PersonAddIcon sx={{ ml: 2 }} />
                                </Button>}
                        </Box>
                    </Box>
                    <ParticipantsTable groupStage={groupStage} isCoordinator={isCoordinator} groupId={groupId} />
                </Box>
            </Box >
        </Box >
    );
}
