import { useState } from 'react';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
// import { Calendar } from 'react-date-range';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, daysInWeek } from 'date-fns';
import subDays from 'date-fns/subDays';
import { Box } from '@mui/system';
import { useEffect } from 'react';


export const DateRangePickerDialog = ({ open, onClose, initialRange, rangeChange }) => {

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    useEffect(() => {
        console.log("initialRange:");
        console.log(initialRange);
        console.log("range:");
        console.log(range);
        if (initialRange[0].startDate === null) {
            range[0].startDate = new Date();
            range[0].endDate = new Date();
        }
    }, [open])

    // const [state, setState] = useState({
    //     selection1: {
    //         startDate: addDays(new Date(), 1),
    //         endDate: null,
    //         key: 'selection1'
    //     },
    //     selection2: {
    //         startDate: addDays(new Date(), 4),
    //         endDate: addDays(new Date(), 8),
    //         key: 'selection2'
    //     },
    //     selection3: {
    //         startDate: addDays(new Date(), 8),
    //         endDate: addDays(new Date(), 10),
    //         key: 'selection3',
    //         autoFocus: false
    //     }
    // });

    const handleSelectRange = () => {
        rangeChange(range);
        // rangeChange(range[0].startDate, range[0].endDate);
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
        <Dialog
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
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
                        // ranges={(initialRange.startDate === null) ? [{ startDate: new Date(), endDate: new Date() }] : range}
                        onChange={(item) => setRange([item.selection])}
                        months={1}
                        weekStartsOn={1}
                        minDate={subDays(new Date(), 1)}
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
                    // shownDate={new Date()}
                    // preview={(range[0].startDate !== null && range[0].endDate !== null) ?
                    //     { startDate: range[0].startDate, endDate: range[0].endDate } :
                    //     { startDate: new Date(), endDate: new Date() }
                    // }
                    />
                    {/* <DateRange
                        onChange={item => setState({ ...state, ...item })}
                        ranges={[state.selection1, state.selection2, state.selection3]}
                    /> */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAction}>Cancel</Button>
                <Button variant="contained" sx={{ color: "#FFFFFF" }} onClick={handleSelectRange}>Add</Button>
            </DialogActions>
        </Dialog >
    )
}