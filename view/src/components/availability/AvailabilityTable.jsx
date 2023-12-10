import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteAvailabilityDialog } from "./DeleteAvailabilityDialog";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export const AvailabilityTable = ({ availabilities, groupId, onSuccess }) => {
    const [deleteAvailabilityDialogOpen, setDeleteAvailabilityDialogOpen] = useState(false);
    const [availabilityId, setAvailabilityId] = useState([]);

    const deleteAvailabilityAction = (availabilityId) => {
        setAvailabilityId(availabilityId);
        setDeleteAvailabilityDialogOpen(true);
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
            field: 'endDate', headerName: 'EndDate', renderHeader: () => (
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
            getActions: (params) => {
                const availabilityId = params.row.availabilityId;
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: "error.main" }} />}
                        label="Remove from group"
                        onClick={() => deleteAvailabilityAction(availabilityId)}
                    />
                ];
            }
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
                groupId={groupId}
                availabilityId={availabilityId}
                onSuccess={() => onSuccess()}
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
                        fontSize: "16px"
                    },
                    '& .MuiDataGrid-columnHeader': {
                        fontSize: "20px"
                    }
                }}
                getRowHeight={() => 'auto'}
                autoHeight
                columns={availabilityColumns}
                rows={availabilities}
                getRowId={row => row.availabilityId}
                hideFooter
                disableColumnMenu
            />
        </Box>
    );
};