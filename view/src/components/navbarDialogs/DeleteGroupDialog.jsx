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
import { ErrorToast } from '../toasts/ErrorToast';
import { doDelete } from '../utils/fetch-utils';
import { SuccessToast } from '../toasts/SuccessToast';


export const ConfirmDeleteGroupDialog = ({ open, onClose, groupId }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [deleteError, setDeleteError] = useState("Ups! Something went wrong. Try again.");
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const navigate = useNavigate();

    const deleteAction = async () => {
        setIsDeleting(true);
        await doDelete('/api/v1/trip-group/group?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => {
                setSuccessToastOpen(true); 
                setTimeout(() => {                           
                    navigate('/dashboard', { leftGroup: true });
                }, 4000);
            })
            .catch(err => {
                setErrorToastOpen(true);
                setDeleteError(err.message);
            });
        setIsDeleting(false);
    };

    const deleteTripGroup = () => {
        deleteAction();
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Group has been deleted. You will be redirected to dashboard." />
            <ErrorToast
                open={errorToastOpen}
                onClose={() => setErrorToastOpen(false)}
                message={deleteError}
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
                <DialogTitle sx={{ pb: 0 }}>Delete group</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", mb: "20px", color: "text.secondary" }}>
                        <Typography>
                            If you confirm, you will delete this trip group.
                        </Typography>
                        <Typography>
                            Are you sure?
                        </Typography>
                    </Box>
                    <DialogActions>
                        {isDeleting ?
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
                                    onClick={deleteTripGroup}
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