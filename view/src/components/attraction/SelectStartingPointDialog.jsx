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
import { doPatch } from "../../components/utils/fetch-utils";

export const SelectStartingPointDialog = ({ open, onClose, dayPlanId, attractionId }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [creationError, setCreationError] = useState("Ups! Something went wrong. Try again.");

    const handleSelection = async () => {
        await doPatch('/api/v1/day-plan/start?' + new URLSearchParams({ dayPlanId: dayPlanId, attractionId: attractionId }).toString())
            .then(response => {
                setSuccessToastOpen(response.ok);
                setErrorToastOpen(!response.ok);
                onClose();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setCreationError(err.message)
            });
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Attraction selected as astarting point." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} />

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
                <DialogTitle sx={{ pb: 0 }}>
                    Select
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        If you confirm, this attraction will be selected as a starting point of the day.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            sx={{ borderRadius: "20px", fontSize: "12px" }}
                            variant="outlined"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSelection}
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