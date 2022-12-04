import { useState } from 'react';
import { Button } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DateRange } from 'react-date-range';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPost } from "../../components/utils/fetch-utils";


export const DateRangePickerDialog = ({ open, onClose, initialRange, restrictedDays, groupId, rangeChange, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Ups! Something went wrong. Try again.")
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

    localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6IkRvcmlhbiJ9.spFruljGVOCA2_CVdl4nP36AcWeKy2YvEIQ5aYoqrxw")
    localStorage.setItem("userId", 31)

    const handleCreateAvailability = async (groupId, range) => {
        var postBody = {'userId':localStorage.getItem('userId'), 'groupId': groupId, 'dateFrom':range[0].startDate, 'dateTo':range[0].endDate};
        await doPost('/api/v1/availability/user', postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                onSuccess();
            })
            .catch(err => {setErrorToastOpen(true); 
                setErrorToastOpen(err.message)
                setErrorMessage(err.message);
            });
    };

    const handleSelectRange = async () => {
        rangeChange(range);
        await handleCreateAvailability(groupId, range)
        onClose();
    };

    const closeAction = () => {
        // console.log(initialRange);
        // if (initialRange[0].startDate === null) {
        //     range[0].startDate = null;
        //     range[0].endDate = null;
        // }
        onClose();
    }

    return (
        <>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Availability added successfully." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={errorMessage}/>
            <Dialog
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                open={open}
                onClose={closeAction}
            >
                <DialogTitle sx={{ backgroundColor: "primary.main" }}>Select dates</DialogTitle>
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
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: "10px", mx: "10px", mb: "10px" }}
                        onClick={closeAction}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained"
                        sx={{ color: "#FFFFFF", borderRadius: "10px", ml: "10px", mr: "20px", mb: "10px" }}
                        onClick={handleSelectRange}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog >
        </>

    )
}