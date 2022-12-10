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
import { doDelete } from "../../components/utils/fetch-utils";
import { DeletingPermissionApiErrorToast } from '../toasts/DeletingPermissionApiErrorToast';

export const DeleteAvailabilityDialog = ({ open, onClose, groupId, availabilityId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("")

    const handleSuccessClose = async () => {
        await deleteAvailability();
        onClose();
        handleSuccessDeletion();
    };

    const handleSuccessDeletion = async () => {
        setSuccessToastOpen(true);
        onSuccess();
    };

    const deleteAvailability = async () => {
        await doDelete('/api/v1/availability/user?' + new URLSearchParams({ availabilityId: availabilityId, groupId: groupId }).toString())
            .catch(err => {
                setApiErrorMessage(err.message);
            });
    };

    return (
        <div>
            <SuccessToast
                open={successToastOpen}
                onClose={() => setSuccessToastOpen(false)}
                message="Availability deleted successfully."
            />
            <ErrorToast
                open={errorToastOpen}
                onClose={() => setErrorToastOpen(false)}
                message="Ups! Something went wrong. Try again."
            />
            <DeletingPermissionApiErrorToast
                open={apiErrorToastOpen}
                onClose={() => { setApiErrorToastOpen(false) }}
                message={apiErrorMessage} />

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