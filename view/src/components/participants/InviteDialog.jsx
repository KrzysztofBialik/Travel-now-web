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


export const InviteDialog = ({ open, onClose }) => {

    const inviteLink = "https://travelnow/invite?token=aeggdffkvnsfvkjdfnfdf374ty83478897hgvuvnineiwjvnuiruhw34hh";

    const [copiedText, setCopiedtext] = useState(inviteLink);
    const [infoToastOpen, setInfoToastOpen] = useState(false);

    const inputHandler = (event) => {
        setCopiedtext(event.target.value);
    };

    const copy = async () => {
        await navigator.clipboard.writeText(copiedText);
        setInfoToastOpen(true);
        onClose();
    };

    return (
        <>
            <InfoToast open={infoToastOpen} onClose={() => setInfoToastOpen(false)} message="Invite link copied!" />
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
                        onChange={inputHandler}
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