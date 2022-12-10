import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPut } from '../utils/fetch-utils';


export const BeginTripDialog = ({ open, onClose, groupId, onSuccess, usersData, tripGroup, isPlanning }) => {



    
    const areConditionsMet = () => {
        const start =tripGroup.startDate;
        const end =tripGroup.endDate;

        
        if( end !== undefined && start !== undefined) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const participantsNumber = usersData.length;
            console.log(startDate);
            console.log(endDate);
            var difference_In_Time = endDate.getTime() - startDate.getTime();
            var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);        
            const groupMinNumOfDays = tripGroup.minimalNumberOfDays;
            const groupMinPart = tripGroup.minimalNumberOfParticipants;
            if(difference_In_Days >= groupMinNumOfDays && participantsNumber >= groupMinPart) {
                return true;
            }
            else {
                return false;
            }
            
        }
        return true;
    }
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("Ups! Something went wrong. Try again.")

    const handleSuccessClose = () => {
        startTrip();
        onClose();
    };

    const startTrip = async () => {
        await doPut('/api/v1/trip-group?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => {
                setSuccessToastOpen(true);
                onSuccess();
            })
            .catch(err => {
                setApiErrorMessage(err);
                console.log('Request Failed', err)});
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Trip successfully started" />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={apiErrorMessage} />

            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minWidth: "600px",
                        maxWidth: "600px",
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>Begin trip</DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    {isPlanning ? 
                    areConditionsMet() ? 
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, you will change trip status to trip stage! 
                        You will not be able to modify availabilities and accommodation!
                    </DialogContentText>
                    :
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, you will change trip status to trip stage! 
                        Be aware that not all group constraints regarding min number of participants or min number of days are met !
                    </DialogContentText>
                    
                    :
                    <DialogContentText sx={{ mb: "20px" }}>
                        If you confirm, you will change trip status to post trip stage! 
                    </DialogContentText>

                }
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ borderRadius: "20px", fontSize: "12px" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSuccessClose}
                            sx={{ color: "#FFFFFF", borderRadius: "20px", fontSize: "12px" }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};