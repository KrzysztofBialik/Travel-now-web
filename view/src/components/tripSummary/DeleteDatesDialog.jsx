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
import { doPut } from '../utils/fetch-utils';


export const DeleteDatesDialog = ({ open, onClose, deleteDates, groupId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("Ups! Something went wrong. Try again.")

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        deleteDates();
        onSuccess();
        onClose();
    };

    const handleDeletion = async () => {
        await doPut('/api/v1/trip-group/selected-availability?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => {
                if (response.ok) {
                    handleSuccessClose();
                }
            })
            .catch(err => {
                setErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Dates successfully deleted." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={apiErrorMessage} />
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minWidth: "400px",
                        maxWidth: "400px",
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>Delete</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, dates will no longer be selected.
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
                            onClick={handleDeletion}
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