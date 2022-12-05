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
import { Routes, Route, useNavigate } from 'react-router-dom';

export const RemoveParticipantDialog = ({ open, onClose, groupId, userId, isDeletingHimself, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("")
    const navigate = useNavigate();

    const title = isDeletingHimself ? "Leave group" : "Remove";
    const info = isDeletingHimself ?
        "If you confirm you will leave this trip group"
        :
        "If you confirm, this participant will be removed from trip group";

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

    const deleteUserFromGroup = async () => {
        if (isDeletingHimself) {
            await doDelete('/api/v1/trip-group/user?' + new URLSearchParams({ groupId: groupId }).toString())
                .then(response => leaveGroup())
                .catch(err => {
                    setApiErrorToastOpen(true)
                    setApiErrorMessage(err.message);
                });
        }
        else {
            await doDelete('/api/v1/trip-group/coordinator-user?' + new URLSearchParams({ groupId: groupId, userId: userId }).toString())
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
            <DeletingPermissionApiErrorToast open={apiErrorToastOpen} onClose={() => {
                setApiErrorToastOpen(false)
            }} message={apiErrorMessage} />
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    {title}
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        {info}
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ borderRadius: "20px", fontSize: "12px" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSuccessClose}
                            sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px" }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};