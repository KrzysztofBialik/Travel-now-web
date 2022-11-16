import { useState } from "react";
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import { DeleteAvailabilityDialog } from "./DeleteAvailabilityDialog";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export const AvailabilityTable = ({ availabilities }) => {
    const [deleteAvailabilityDialogOpen, setDeleteAvailabilityDialogOpen] = useState(false);

    const deleteAvailabilityAction = () => {
        setDeleteAvailabilityDialogOpen(true);
    };

    const handleDelete = () => {
        console.log("Availability deleted.")
    }

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
            field: 'actions', headerName: 'Actions', renderHeader: () => (
                <strong>
                    Actions
                </strong>
            ), type: 'actions', flex: 1, hideable: true, headerAlign: 'center', minWidth: 100,
            getActions: () => [
                <GridActionsCellItem
                    icon={<DeleteIcon sx={{ color: "primary.main" }} />}
                    label="Remove from group"
                    onClick={deleteAvailabilityAction}
                />
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
            <DeleteAvailabilityDialog
                open={deleteAvailabilityDialogOpen}
                onClose={() => setDeleteAvailabilityDialogOpen(false)}
                deleteAvailability={handleDelete}
            />
            <DataGrid
                sx={{
                    mb: "50px",
                    px: 2,
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    [`& .${gridClasses.cell}`]: {
                        py: 1,
                    },
                }}
                getRowHeight={() => 'auto'}
                autoHeight
                columns={availabilityColumns}
                rows={availabilities}
                hideFooter
            />
        </Box>
    );
};