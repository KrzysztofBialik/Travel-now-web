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

export const SelectOptimizedDatesDialog = ({ open, onClose }) => {

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
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Dates selected successfully." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Select</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you confirm, this dates will be currently selected for the trip.
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleErrorClose}
                            sx={{
                                color: "secondary.main",
                                borderColor: "secondary.main",
                                borderRadius: "20px",
                                "&:hover": {
                                    color: "secondary.dark",
                                    borderColor: "secondary.dark",
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSuccessClose}
                            sx={{
                                backgroundColor: "secondary.main",
                                borderRadius: "20px",
                                "&:hover": {
                                    backgroundColor: "secondary.dark"
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};