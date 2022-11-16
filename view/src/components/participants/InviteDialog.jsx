import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
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
            >
                <DialogTitle sx={{ mb: "10px" }}>Get invite link</DialogTitle>
                <DialogContent>
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
                            sx={{ color: "#FFFFFF", borderRadius: "20px" }}
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