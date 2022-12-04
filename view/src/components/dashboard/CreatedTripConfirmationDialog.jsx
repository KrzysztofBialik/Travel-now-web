import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const CreatedTripConfirmationDialog = ({ open, onClose, onSuccess }) => {

    const close = () => {
        onSuccess();
        onClose();
    };

    return (
        <div>
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
                    Congratulations!
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        You have created your next trip. Next step - planning.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="contained"
                            sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px" }}
                            onClick={onClose}
                        >
                            Return
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}