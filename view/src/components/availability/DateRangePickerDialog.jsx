import { useState } from 'react';
import { Button } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Dialog } from '@mui/material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DateRange } from 'react-date-range';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPost } from "../../components/utils/fetch-utils";
import { format } from "date-fns";


export const DateRangePickerDialog = ({ open, onClose, initialRange, restrictedDays, groupId, rangeChange, onSuccess, shared = false }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Ups! Something went wrong. Try again.");
    const [isAdding, setIsAdding] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    useEffect(() => {
        if (initialRange[0].startDate === null) {
            range[0].startDate = new Date();
            range[0].endDate = new Date();
        }
    }, [open]);

    const handleCreateAvailability = async (groupId, range) => {
        setIsAdding(true);
        if (shared) {
            var postBody = { 'dateFrom': format(range[0].startDate, 'yyyy-MM-dd'), 'dateTo': format(range[0].endDate, 'yyyy-MM-dd') };
            await doPost('/api/v1/shared-availability/dto?' + new URLSearchParams({ groupId: groupId }), postBody)
                .then(response => {
                    setSuccessToastOpen(response.ok);
                    onSuccess();
                })
                .catch(err => {
                    setErrorToastOpen(true);
                    setErrorToastOpen(err.message)
                    setErrorMessage(err.message);
                });
        } else {
            var postBody = { 'userId': localStorage.getItem('userId'), 'groupId': groupId, 'dateFrom': format(range[0].startDate, 'yyyy-MM-dd'), 'dateTo': format(range[0].endDate, 'yyyy-MM-dd') };
            await doPost('/api/v1/availability/user', postBody)
                .then(response => {
                    setSuccessToastOpen(response.ok);
                    onSuccess();
                })
                .catch(err => {
                    setErrorToastOpen(true);
                    setErrorToastOpen(err.message)
                    setErrorMessage(err.message);
                });
        }
        setIsAdding(false);
    };

    const handleSelectRange = async () => {
        rangeChange(range);
        await handleCreateAvailability(groupId, range)
        onClose();
    };

    const closeAction = () => {
        onClose();
    }

    return (
        <>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Availability added successfully." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={errorMessage} />
            <Dialog
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                open={!!open}
                onClose={closeAction}
                PaperProps={{
                    style: {
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFFFFF",
                        mb: 2
                    }}
                >
                    <Typography sx={{ color: "#FFFFFF", fontSize: "24px" }}>
                        Select dates
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={onClose}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: "20px"
                    }}>
                        <DateRange
                            ranges={range}
                            onChange={(item) => setRange([item.selection])}
                            months={1}
                            weekStartsOn={1}
                            minDate={new Date()}
                            disabledDates={restrictedDays}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            direction="horizontal"
                            className='calendarElement'
                            showSelectionPreview={true}
                            showPreview={true}
                            rangeColors={["#2ab7ca"]}
                            color={"#2ab7ca"}
                            fixedHeight={true}
                            dateDisplayFormat={"dd.MM.yyyy"}
                            startDatePlaceholder="Start date"
                            endDatePlaceholder="End date"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ mb: 1, mr: 1 }}>
                    {isAdding ?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ color: "#FFFFFF", borderRadius: "20px", minWidth: "80px" }}
                        >
                            <CircularProgress size="24px" sx={{ color: "#FFFFFF" }} />
                        </Button>
                        :
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{ borderColor: "primary.main", borderRadius: "20px" }}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ color: "#FFFFFF", borderRadius: "20px", minWidth: "80px", ml: 1 }}
                                onClick={handleSelectRange}
                            >
                                Add
                            </Button>
                        </Box>
                    }
                </DialogActions>
            </Dialog >
        </>
    );
};