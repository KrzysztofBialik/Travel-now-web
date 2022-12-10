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


export const EndTripDialog = ({ open, onClose, groupId, onSuccess}) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("Ups! Something went wrong. Try again.")

    const handleSuccessClose = () => {
        startTrip();
        onClose();
    };

    const startTrip = async () => {
        await doPut('/api/v1/trip-group?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => {
                setSuccessToastOpen(true);
                onSuccess();
            })
            .catch(err => {
                setApiErrorMessage(err);
                console.log('Request Failed', err)});
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Trip successfully ended" />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={apiErrorMessage} />

            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minWidth: "600px",
                        maxWidth: "600px",
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>Begin trip</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, you will change trip status to post trip stage! 
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