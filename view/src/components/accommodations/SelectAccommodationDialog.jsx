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


export const SelectAccommodationDialog = ({ open, onClose }) => {
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Accommodation successfully selected." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle sx={{ backgroundColor: "primary.main" }}>Select</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, this accommodation will be selected as the currently chosen accommodation.
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleErrorClose}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSuccessClose}
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