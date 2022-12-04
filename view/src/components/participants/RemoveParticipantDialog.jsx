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
import {Routes, Route, useNavigate} from 'react-router-dom';

export const RemoveParticipantDialog = ({ open, onClose, groupId, userId, isDeletingHimself, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("")
    const navigate = useNavigate();

    const handleSuccessClose = async () => {
        await deleteUserFromGroup()
        onClose();
        }

    const handleSuccessDeletion = async () => {
        setSuccessToastOpen(true);
        onSuccess();
    }
        
    const leaveGroup = () => {
        navigate('/dashboard');
      };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };
    localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6IkRvcmlhbiJ9.spFruljGVOCA2_CVdl4nP36AcWeKy2YvEIQ5aYoqrxw")
    localStorage.setItem("userId", 31)

    const deleteUserFromGroup = async () => {
        if (isDeletingHimself) {
            await doDelete('/api/v1/trip-group/user?' + new URLSearchParams({ groupId: groupId}).toString())
            .then(response => leaveGroup())
            .catch(err => {
                setApiErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
        }
        else{
            await doDelete('/api/v1/trip-group/coordinator-user?' + new URLSearchParams({ groupId: groupId ,userId: userId}).toString())
            .then(response => handleSuccessDeletion())
            .catch(err => {
                setApiErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
    }

    }

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Participant successfully removed from group." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <DeletingPermissionApiErrorToast open={apiErrorToastOpen} onClose={() => {setApiErrorToastOpen(false)
                                                                                     }} message={apiErrorMessage} />
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