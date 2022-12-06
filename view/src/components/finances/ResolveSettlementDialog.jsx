import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { doPatch } from "../../components/utils/fetch-utils";

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';

export const ResolveSettlementDialog = ({ open, onClose, handleResolve, requestId, groupId , onSuccess}) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const handleSuccessClose = () => {
        setSuccessToastOpen(true);
        handleResolve();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const acceptFinancialRequest = async () => {
        await doPatch('/api/v1/finance-request?' + new URLSearchParams({ requestId : requestId ,groupId: groupId }).toString() )
            .then(response => {
                setSuccessToastOpen(response.ok);
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
            });
    }

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Settlement resolved." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Resolve</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: "10px" }}>
                        Are you sure you want to resolve this settlement? Action can't be undone.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            sx={{ borderRadius: "20px" }}
                            variant="outlined"
                            onClick={onClose}
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