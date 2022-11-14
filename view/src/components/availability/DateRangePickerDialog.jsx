import { useState } from 'react';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
// import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import { Box } from '@mui/system';


export const DateRangePickerDialog = ({ open, onClose }) => {

    const handleSelect = (date) => {
        console.log(date); // native Date object
    };

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);


    const handleSelectRange = (ranges) => {
        {
            //   selection: {
            //     startDate: [native Date Object],
            //     endDate: [native Date Object],
            //   }
        }
    };

    return (
        <Dialog
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
            open={open}
            onClose={onClose}
        >
            <DialogTitle sx={{ backgroundColor: "primary.main" }}>Select dates</DialogTitle>
            {/* <Calendar
                date={new Date()}
                onChange={handleSelect}
            /> */}
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
                        onChange={handleSelectRange}
                        weekStartsOn={1}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={true}
                        direction="horizontal"
                    // className='calendarElement'
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
                <Button>Add</Button>
            </DialogActions>
        </Dialog >
    )
}