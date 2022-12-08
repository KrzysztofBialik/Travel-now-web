import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { ErrorToast } from '../toasts/ErrorToast';
import { doDelete } from '../utils/fetch-utils';


export const ConfirmLeaveGroupDialog = ({ open, onClose, groupId }) => {

    const [isLeaving, setIsLeaving] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [leaveError, setLeaveError] = useState("Ups! Something went wrong. Try again.");
    const navigate = useNavigate();

    const leaveAction = async () => {
        setIsLeaving(true);
        await doDelete('/api/v1/trip-group/user?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => {
                navigate('/dashboard', { leftGroup: true });
            })
            .catch(err => {
                setErrorToastOpen(true);
                setLeaveError(err.message);
            });
        setIsLeaving(false);
    };

    const leaveTripGroup = () => {
        leaveAction();
        onClose();
    };

    return (
        <div>
            <ErrorToast
                open={errorToastOpen}
                onClose={() => setErrorToastOpen(false)}
                message={leaveError}
            />
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
                <DialogTitle sx={{ pb: 0 }}>Leave group</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, you will leave this trip group and it will not be visible for you. Are you sure?
                    </DialogContentText>
                    <DialogActions>
                        {isLeaving ?
                            <Button
                                variant="contained"
                                sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px", minWidth: "90px" }}
                            >
                                <CircularProgress size="20px" sx={{ color: "#FFFFFF" }} />
                            </Button>
                            :
                            <>
                                <Button
                                    sx={{ borderRadius: "20px", fontSize: "12px" }}
                                    variant="outlined"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={leaveTripGroup}
                                    sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px", }}
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