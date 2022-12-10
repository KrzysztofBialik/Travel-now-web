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


export const ResolveSettlementDialog = ({ open, onClose, handleResolve, requestId, groupId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const handleSuccessClose = () => {
        acceptFinancialRequest()
        handleResolve();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    const acceptFinancialRequest = async () => {
        await doPatch('/api/v1/finance-request/accept?' + new URLSearchParams({ requestId: requestId, groupId: groupId }).toString())
            .then(response => {
                setSuccessToastOpen(response.ok);
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
            });
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Settlement resolved." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minWidth: "450px",
                        maxWidth: "450px",
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>
                    Resolve
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        Are you sure you want to resolve this settlement? Action can't be undone.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: "20px", fontSize: "12px" }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "20px", color: "#FFFFFF", width: "100px", fontSize: "12px" }}
                            onClick={handleSuccessClose}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};