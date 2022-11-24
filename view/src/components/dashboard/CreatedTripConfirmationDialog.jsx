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
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: "10px", mx: "10px", mb: "10px" }}
                            onClick={onClose}
                        >
                            Return
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ color: "#FFFFFF", borderRadius: "10px", ml: "10px", mr: "20px", mb: "10px" }}
                            color="primary"
                            href="/tripSummary"
                        >
                            Details
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}