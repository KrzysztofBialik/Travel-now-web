import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const UpdatedUserConfirmationDialog = ({ open, onClose }) => {

    return (
        <div>
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
                <DialogTitle sx={{ pb: 0 }}>Congratulations!</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText>
                        You have updated your user account details
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            sx={{ borderRadius: "20px", fontSize: "12px", color: "#FFFFFF" }}
                            variant="contained"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};