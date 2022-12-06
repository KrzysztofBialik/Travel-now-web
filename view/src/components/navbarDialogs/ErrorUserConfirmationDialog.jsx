import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const ErrorUserConfirmationDialog = ({ open, onClose, message }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Updating user account failed!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        There were error while updating your account. Sorry for inconvenience.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                mt: "20px",
                                backgroundColor: "primary.main",
                                color: "#FFFFFF",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                    borderColor: "primary.dark"
                                }
                            }}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}