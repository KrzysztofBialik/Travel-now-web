import { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { SelectOptimizedDatesDialog } from "./SelectOptimizedDatesDialog";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export const OptimizedDatesTable = ({ optimizedDates }) => {

    const [selectOptimizedDatesDialogOpen, setSelectOptimizedDatesDialogOpen] = useState(false);

    const selectDatesAction = () => {
        setSelectOptimizedDatesDialogOpen(true);
    };

    const availabilityColumns = [

        {
            field: 'startDate', headerName: 'StartDate', renderHeader: () => (
                <strong>
                    Start Date
                </strong>
            ), type: 'date', flex: 2, hideable: true, headerAlign: 'center', align: 'center', minWidth: 200,
        },
        {
            field: 'endDate', headerName: 'EtartDate', renderHeader: () => (
                <strong>
                    End Date
                </strong>
            ), type: 'date', flex: 2, hideable: true, headerAlign: 'center', align: 'center', minWidth: 200,
        },
        {
            field: 'days', headerName: 'Days', renderHeader: () => (
                <strong>
                    Number of Days
                </strong>
            ), type: 'number', flex: 2, hideable: true, headerAlign: 'center', align: 'center', minWidth: 100,
        },
        {
            field: 'participants', headerName: 'Participants', renderHeader: () => (
                <strong>
                    Number of participants
                </strong>
            ), type: 'number', flex: 3, hideable: true, headerAlign: 'center', align: 'center', minWidth: 150,
        },
        {
            field: 'actions', headerName: 'Action', renderHeader: () => (
                <strong>
                    Action
                </strong>
            ), type: 'actions', flex: 3, hideable: true, headerAlign: 'center', minWidth: 100,
            getActions: () => [
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "secondary.main",
                        borderRadius: "20px",
                        "&:hover": {
                            backgroundColor: "secondary.dark"
                        }
                    }}
                    onClick={selectDatesAction}
                >
                    <CheckOutlinedIcon />
                    Accept
                </Button>
            ]
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <SelectOptimizedDatesDialog
                open={selectOptimizedDatesDialogOpen}
                onClose={() => setSelectOptimizedDatesDialogOpen(false)}
            />

            <DataGrid
                sx={{
                    mb: "50px",
                    px: 2,
                    '& .MuiDataGrid-cell:hover': {
                        color: 'secondary.main',
                    },
                    [`& .${gridClasses.cell}`]: {
                        py: 1,
                    },
                }}
                getRowHeight={() => 'auto'}
                autoHeight
                columns={availabilityColumns}
                rows={optimizedDates}
                hideFooter
            />
        </Box>
    );
};