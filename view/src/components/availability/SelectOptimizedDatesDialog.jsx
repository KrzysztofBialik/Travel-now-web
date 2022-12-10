import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { doPut } from "../../components/utils/fetch-utils";
import { DeletingPermissionApiErrorToast } from '../toasts/DeletingPermissionApiErrorToast';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';

export const SelectOptimizedDatesDialog = ({ open, onClose, sharedGroupAvailability, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("")

    const handleSuccessClose = async () => {
        await acceptSharedAvailability();
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const handleSuccessfulAccept = async () => {
        setSuccessToastOpen(true);
        onSuccess();
    };

    const acceptSharedAvailability = async () => {
        await doPut('/api/v1/shared-availability/accept?' + new URLSearchParams({ sharedGroupAvailabilityId: sharedGroupAvailability }).toString())
            .then(response => handleSuccessfulAccept())
            .catch(err => {
                setApiErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Dates selected successfully." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <DeletingPermissionApiErrorToast open={apiErrorToastOpen} onClose={() => {
                setApiErrorToastOpen(false)
            }} message={apiErrorMessage} />
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
                <DialogTitle sx={{ pb: 0 }}>Select</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText>
                        If you confirm, this dates will be currently selected for the trip.
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