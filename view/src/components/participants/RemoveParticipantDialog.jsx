import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { DeletingPermissionApiErrorToast } from '../toasts/DeletingPermissionApiErrorToast';
import { doDelete } from "../../components/utils/fetch-utils";

export const RemoveParticipantDialog = ({ open, onClose, groupId, userId }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("deafukt")
    const [hasFailed, setHasFailed] = useState(false)

    const handleSuccessClose = async () => {
    
        await deleteUserFromGroup()
        console.log("Has failed" + hasFailed)
        console.log("Interesting " + apiErrorMessage)
        if(hasFailed){
         console.log("Interesting " + apiErrorMessage)
         setApiErrorToastOpen(true)
         onClose()
        }
        else {
        // window.location.reload(false);
        setSuccessToastOpen(true);
        onClose();
        }
        
    };

    const handleErrorClose = () => {
        console.log("here");
        setErrorToastOpen(true);
        onClose();
    };
    localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6IkRvcmlhbiJ9.spFruljGVOCA2_CVdl4nP36AcWeKy2YvEIQ5aYoqrxw")
    localStorage.setItem("userId", 31)

    const deleteUserFromGroup = async () => {
        await doDelete('/api/v1/trip-group/coordinator-user?' + new URLSearchParams({ groupId: groupId ,userId: userId}).toString())
        .then(response => response.json())
        .catch(err => {
            setHasFailed(true)
            setApiErrorMessage(err);
            console.log("doring good job" + hasFailed + apiErrorMessage)
        });

    }

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Participant successfully removed from group." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <DeletingPermissionApiErrorToast open={apiErrorToastOpen} onClose={() => setApiErrorToastOpen(false)} message={apiErrorMessage} />
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Remove</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you confirm, this participant will be removed from the trip group.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={handleErrorClose}
                            sx={{ borderRadius: "20px" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSuccessClose}
                            sx={{ color: "#FFFFFF", borderRadius: "20px" }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};