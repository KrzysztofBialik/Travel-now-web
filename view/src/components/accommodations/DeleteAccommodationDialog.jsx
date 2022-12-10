import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { ErrorToast } from '../toasts/ErrorToast';
import { doDelete } from "../../components/utils/fetch-utils";

export const DeleteAccommodationDialog = ({ open, onClose, accommodationId, onSuccess }) => {

    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [deletionError, setDeletionError] = useState('Ups! Something went wrong. Try again.');

    const handleSuccessClose = () => {
        onClose();
    };

    const handleDeleteAttraction = async () => {
        await doDelete('/api/v1/accommodation?' + new URLSearchParams({ accommodationId: accommodationId }).toString())
            .then(response => {
                handleSuccessClose()
                onSuccess();
                onClose();
            })
            .catch(err => {
                setDeletionError(err.message);
                setErrorToastOpen(true);
            });
    };

    return (
        <div>
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={deletionError} />
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, your accommodation will be removed from list.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: "20px" }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: "20px", color: "#FFFFFF", width: "100px" }}
                            onClick={handleDeleteAttraction}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};