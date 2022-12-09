import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doDelete } from "../../components/utils/fetch-utils";

export const DeleteDayPlanDialog = ({ open, onClose, dayPlanId, onSuccess }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [deletionError, setDeletionError] = useState("Ups! Something went wrong. Try again.");

    const handleSuccessClose = () => {
        onClose();
        onSuccess();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const handleDeleteDayPlan = async (dayPlanId) => {
        setIsDeleting(true);
        await doDelete('/api/v1/day-plan?dayPlanId=' + dayPlanId)
            .then(response => {
                // setSuccessToastOpen(response.ok);
                setIsDeleting(false);
                handleSuccessClose();
            })
            .catch(err => {
                setIsDeleting(false);
                setErrorToastOpen(true);
                setDeletionError(err.message)
            });
        setIsDeleting(false);
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
                        {isDeleting ?
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: "20px", color: "#FFFFFF", width: "100px" }}
                            >
                                <CircularProgress size="24px" sx={{ color: "#FFFFFF" }} />
                            </Button>
                            :
                            <>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: "20px" }}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", width: "100px" }}
                                    onClick={() => handleDeleteDayPlan(dayPlanId)}
                                >
                                    Confirm
                                </Button>
                            </>
                        }
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};