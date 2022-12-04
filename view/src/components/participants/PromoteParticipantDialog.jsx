import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { doPut } from "../../components/utils/fetch-utils";
import { DeletingPermissionApiErrorToast } from '../toasts/DeletingPermissionApiErrorToast';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';

export const PromoteParticipantDialog = ({ open, onClose, groupId, userId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorToastOpen, setApiErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("")


    const handleSuccessClose =async () => {
        await promoteUserToCoordinator();
        onClose();
    };

    const handleGivingCorrectPermission = async  () => {
        setSuccessToastOpen(true);
        onSuccess();
    }

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const promoteUserToCoordinator = async () => {
        await doPut('/api/v1/user-group/coordinator?' + new URLSearchParams({ groupId: groupId,  userId: userId}).toString())
            .then(response => handleGivingCorrectPermission())
            .catch(err => {
                setApiErrorToastOpen(true)
                setApiErrorMessage(err.message);
            });
        }

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="User promoted to coordinator." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <DeletingPermissionApiErrorToast open={apiErrorToastOpen} onClose={() => {setApiErrorToastOpen(false)
                                                                                     }} message={apiErrorMessage} />

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Promote</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you confirm, this user will have coordinator status.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={handleErrorClose}
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