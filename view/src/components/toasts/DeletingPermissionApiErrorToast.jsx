import { Slide } from "@mui/material";
import { Stack } from "@mui/system";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';


function Transition(props) {
    return <Slide {...props} direction="up" unmountOnExit />;
};

export const DeletingPermissionApiErrorToast = ({ open, onClose, message }) => {

    const state = {
        open: false,
        Transition: Transition
    };

    return (
        <Stack>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={3000}
                onClose={onClose}
                TransitionComponent={state.Transition}
            >
                <Alert variant="filled" severity="error" onClose={onClose}>
                    <AlertTitle>Error</AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};