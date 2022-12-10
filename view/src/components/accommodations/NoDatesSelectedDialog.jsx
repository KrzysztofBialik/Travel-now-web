import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const NoDatesSelectedDialog = ({ open, onClose }) => {

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
                    Info
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText sx={{ mb: "10px" }}>
                        You can't open transport suggestions until dates of the trip are selected.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="contained"
                            sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px" }}
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