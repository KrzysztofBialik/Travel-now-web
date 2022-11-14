import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const CreatedTripConfirmationDialog = ({ open, onClose }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have created your next trip. Proceed to see the details or close dialog to return to dashboard.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={onClose}>Return</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="/tripOverview"
                        >Details</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}