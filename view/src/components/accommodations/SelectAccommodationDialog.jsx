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


export const SelectAccommodationDialog = ({ open, onClose, groupId, accommodationId, onSuccess }) => {
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("Ups! Something went wrong. Try again.");

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        onSuccess();
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const acceptSharedAvailability = async () => {
        await doPut('/api/v1/trip-group/accommodation?' + new URLSearchParams({ groupId: groupId, accommodationId: accommodationId}).toString())
            .then(response => handleSuccessClose())
            .catch(err => {
                setErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
        }

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Accommodation successfully selected." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={apiErrorMessage} />

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Select</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, this accommodation will be selected as the currently chosen accommodation.
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={acceptSharedAvailability}
                            sx={{ color: "#FFFFFF" }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}