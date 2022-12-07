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

export const DeleteAccommodationDialog = ({ open, onClose, accommodationId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [deletionError, setDeletionError] = useState('Ups! Something went wrong. Try again.');


    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const handleDeleteAttraction = async () => {
        await doDelete('/api/v1/accommodation?' + new URLSearchParams({ accommodationId: accommodationId }).toString())
            .then(response => {
                setSuccessToastOpen(response.ok);
                setErrorToastOpen(!response.ok);
                onSuccess();
                onClose();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setDeletionError(err.message);
            });
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, your accommodation will be removed from list.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeleteAttraction}
                            sx={{ color: "#FFFFFF" }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};