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

export const DeleteAvailabilityDialog = ({ open, onClose, deleteAvailability }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        deleteAvailability();
        onClose();
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

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, dates will no longer be selected.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={onClose}
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