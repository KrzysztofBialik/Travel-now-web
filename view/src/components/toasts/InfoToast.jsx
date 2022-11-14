import { Slide } from "@mui/material";
import { Stack } from "@mui/system";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';


function Transition(props) {
    return <Slide {...props} direction="up" unmountOnExit />;
};

export const InfoToast = ({ open, onClose, message }) => {

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
                autoHideDuration={1500}
                onClose={onClose}
                TransitionComponent={state.Transition}
            >
                <Alert variant="filled" severity="info" >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};