import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export const OtherParticipantsAvailabilityTable = ({ availabilities }) => {

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
    ];

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
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