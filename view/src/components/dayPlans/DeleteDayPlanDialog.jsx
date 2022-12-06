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

export const DeleteDayPlanDialog = ({ open, onClose, dayPlanId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [deletionError, setDeletionError] = useState("Ups! Something went wrong. Try again.");

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const handleDeleteDayPlan = async (dayPlanId) => {
        await doDelete('/api/v1/day-plan?dayPlanId=' + dayPlanId)
            .then(response => {
                setSuccessToastOpen(response.ok);
                handleSuccessClose();
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setDeletionError(err.message)
            });
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Day plan successfully deleted." />
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
                <DialogTitle sx={{ pb: 0 }}>
                    Delete
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, your day plan will be deleted.
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
                            onClick={() => handleDeleteDayPlan(dayPlanId)}
                            sx={{
                                color: "#FFFFFF",
                                borderRadius: "20px",
                                fontSize: "12px"
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};