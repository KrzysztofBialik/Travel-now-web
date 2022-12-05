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
            >
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have created your next trip. Next step - planning.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                mx: "10px",
                                mb: "10px",
                                backgroundColor: "primary.main",
                                color: "#FFFFFF",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                    borderColor: "primary.dark"
                                }
                            }}
                            onClick={close}
                        >
                            Return
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}