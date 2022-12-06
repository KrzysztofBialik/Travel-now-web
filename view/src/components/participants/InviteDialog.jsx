import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InfoToast } from '../toasts/InfoToast';
import { useEffect } from 'react';
import { doGet } from '../utils/fetch-utils';
import { ErrorToast } from '../toasts/ErrorToast';


export const InviteDialog = ({ open, onClose, groupId, inviteLink, copiedText, errorToast }) => {

    // const inviteLink = "https://travelnow/invite?token=aeggdffkvnsfvkjdfnfdf374ty83478897hgvuvnineiwjvnuiruhw34hh";

    // const [inviteLink, setInviteLink] = useState("");
    // const [copiedText, setCopiedtext] = useState(inviteLink);
    const [infoToastOpen, setInfoToastOpen] = useState(false);

    // const inputHandler = (event) => {
    //     setCopiedtext(event.target.value);
    // };

    // const getInvitationLink = async () => {
    //     await doGet('/api/v1/invitation?' + new URLSearchParams({ group: groupId }).toString())
    //         .then(response => {
    //             setInviteLink(response.headers.get('Location').replace('http://localhost:8080/api/v1/invitation/', 'http://localhost:3000/invite'))
    //             setCopiedtext(response.headers.get('Location').replace('http://localhost:8080/api/v1/invitation/', 'http://localhost:3000/invite'))
    //         })
    //         .catch(err => {
    //             setErrorToastOpen(true)
    //             setCreationError(err.message)
    //         });
    //     console.log('kupa')
    // }

    // useEffect(() => {
    //     getInvitationLink();
    // })

    const copy = async () => {
        await navigator.clipboard.writeText(copiedText);
        setInfoToastOpen(true);
        onClose();
    };

    return (
        <>
            <InfoToast open={infoToastOpen} onClose={() => setInfoToastOpen(false)} message="Invite link copied!" />
            {/* <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} /> */}
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#000000",
                    }}
                >
                    <Typography sx={{ fontSize: "24px" }}>
                        Get invitation link
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={onClose}
                    >
                        <CloseIcon sx={{ color: "primary.main", fontSize: "24px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <TextField
                        sx={{ minWidth: "500px" }}
                        margin="normal"
                        label="Link"
                        defaultValue={inviteLink}
                        onChange={copy}
                    >
                    </TextField>
                    <DialogActions>
                        <Button
                            variant="contained"
                            sx={{ color: "#FFFFFF", borderRadius: "12px" }}
                            onClick={copy}
                        >
                            Copy
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};