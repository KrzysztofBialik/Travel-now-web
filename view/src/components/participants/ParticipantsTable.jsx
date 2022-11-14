import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StarIcon from '@mui/icons-material/Star';
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    // GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { RemoveParticipantDialog } from './RemoveParticipantDialog';
import { PromoteParticipantDialog } from './PromoteParticipantDialog';


export const usersData = [
    {
        id: 1,
        name: "Kajtek",
        surname: "Barański",
        mail: "kajtek.boba@gmail.com",
        username: "BoBa",
        phoneNumber: 111111111,
        role: "coordinator"
    },
    {
        id: 2,
        name: "Dorian",
        surname: "Bestrzyński",
        mail: "dorek.best@gmail.com",
        username: "Olisadebe",
        phoneNumber: 222222222,
        role: "participant"
    },
    {
        id: 3,
        name: "Krzysztof",
        surname: "Bialik",
        mail: "krzychu77@gmail.com",
        username: "krzychu77",
        phoneNumber: 333333333,
        role: "participant"
    },
    {
        id: 4,
        name: "Piotr",
        surname: "Martin",
        mail: "piter.martin@gmail.com",
        username: "Piterm33",
        phoneNumber: 444444444,
        role: "participant"
    },
    {
        id: 5,
        name: "Kajtek",
        surname: "Barański",
        mail: "kajtek.boba@gmail.com",
        username: "BoBa",
        phoneNumber: 111111111,
        role: "coordinator"
    },
    {
        id: 3,
        name: "Krzysztof",
        surname: "Bialik",
        mail: "krzychu77@gmail.com",
        username: "krzychu77",
        phoneNumber: 333333333,
        role: "participant"
    },
    {
        id: 4,
        name: "Piotr",
        surname: "Martin",
        mail: "piter.martin@gmail.com",
        username: "Piterm33",
        phoneNumber: 444444444,
        role: "participant"
    },
    {
        id: 5,
        name: "Kajtek",
        surname: "Barański",
        mail: "kajtek.boba@gmail.com",
        username: "BoBa",
        phoneNumber: 111111111,
        role: "coordinator"
    },
    {
        id: 3,
        name: "Krzysztof",
        surname: "Bialik",
        mail: "krzychu77@gmail.com",
        username: "krzychu77",
        phoneNumber: 333333333,
        role: "participant"
    },
    {
        id: 4,
        name: "Piotr",
        surname: "Martin",
        mail: "piter.martin@gmail.com",
        username: "Piterm33",
        phoneNumber: 444444444,
        role: "participant"
    },
    {
        id: 5,
        name: "Kajtek",
        surname: "Barański",
        mail: "kajtek.boba@gmail.com",
        username: "BoBa",
        phoneNumber: 111111111,
        role: "coordinator"
    },
    {
        id: 6,
        name: "Dorian",
        surname: "Bestrzyński",
        mail: "dorek.best@gmail.com",
        username: "Olisadebe",
        phoneNumber: 222222222,
        role: "participant"
    },
    {
        id: 7,
        name: "Krzysztof",
        surname: "Bialik",
        mail: "krzychu77@gmail.com",
        username: "krzychu77",
        phoneNumber: 333333333,
        role: "participant"
    },
    {
        id: 8,
        name: "Piotr",
        surname: "Martin",
        mail: "piter.martin@gmail.com",
        username: "Piterm33",
        phoneNumber: 444444444,
        role: "participant"
    },
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {/* <GridToolbarExport /> */}
        </GridToolbarContainer>
    );
}


export const ParticipantsTable = ({ groupStage, isCoordinator }) => {

    const navigate = useNavigate();
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);

    const removeAction = () => {
        setRemoveDialogOpen(true);
    };

    const promoteAction = () => {
        setPromoteDialogOpen(true);
    };


    const participantColumn = [
        {
            field: 'name', headerName: 'Name', renderHeader: () => (
                <strong>
                    Name
                </strong>
            ), type: 'string', flex: 2, hideable: true, headerAlign: 'center', align: 'left', minWidth: 200
        },
        {
            field: 'surname', headerName: 'Surname', renderHeader: () => (
                <strong>
                    Surname
                </strong>
            ), type: 'string', flex: 2, hideable: true, headerAlign: 'center', align: 'left', minWidth: 200,
        },
        {
            field: 'mail', headerName: 'Mail', renderHeader: () => (
                <strong>
                    Mail
                </strong>
            ), type: 'string', flex: 4, hideable: true, headerAlign: 'center', align: 'left', minWidth: 300,
        },
        {
            field: 'username', headerName: 'Username', renderHeader: () => (
                <strong>
                    Username
                </strong>
            ), type: 'string', flex: 2, hideable: true, headerAlign: 'center', align: 'left', minWidth: 200,
        },
        {
            field: 'role', headerName: 'Role', renderHeader: () => (
                <strong>
                    Role
                </strong>
            ), type: 'string', flex: 1, hideable: true, headerAlign: 'center', align: 'left', minWidth: 100,
        },
        {
            field: 'actions', headerName: 'Actions', renderHeader: () => (
                <strong>
                    Actions
                </strong>
            ), type: 'actions', flex: 1, hideable: true, headerAlign: 'center', minWidth: 100,
            getActions: (params) => {
                if (isCoordinator) {
                    if (groupStage === 1) {
                        return [
                            <GridActionsCellItem
                                icon={<DeleteIcon sx={{ color: "primary.main" }} />}
                                label="Remove from group"
                                onClick={removeAction}
                                showInMenu
                            />,
                            <GridActionsCellItem
                                icon={<EventAvailableIcon sx={{ color: "primary.main" }} />}
                                label="Check availability"
                                onClick={() => { navigate("/availability") }}
                                showInMenu
                            />,
                            <GridActionsCellItem
                                icon={<StarIcon sx={{ color: "secondary.main" }} />}
                                label="Make coordinator"
                                onClick={promoteAction}
                                showInMenu
                            />
                        ];
                    }
                    else {
                        return [
                            <GridActionsCellItem
                                icon={<CurrencyExchangeIcon sx={{ color: "primary.main" }} />}
                                label="Check expenses"
                                onClick={() => { navigate("/expenses") }}
                                showInMenu
                            />,
                            <GridActionsCellItem
                                icon={<StarIcon sx={{ color: "secondary.main" }} />}
                                label="Make coordinator"
                                onClick={promoteAction}
                                showInMenu
                            />
                        ]
                    };
                }
                else {
                    if (groupStage === 1) {
                        return [
                            <GridActionsCellItem
                                icon={<EventAvailableIcon sx={{ color: "primary.main" }} />}
                                label="Check availability"
                                onClick={() => { navigate("/availability") }}
                                showInMenu
                            />
                        ];
                    }
                    else {
                        return [
                            <GridActionsCellItem
                                icon={<CurrencyExchangeIcon sx={{ color: "primary.main" }} />}
                                label="Check expenses"
                                onClick={() => { navigate("/expenses") }}
                                showInMenu
                            />
                        ];
                    }
                }
            },
        },
    ]


    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                // '& .super-app-theme--header': {
                //     fontSize: "16px",
                //     fontWeight: "900"
                // },
            }}
        >
            <RemoveParticipantDialog
                open={removeDialogOpen}
                onClose={() => { setRemoveDialogOpen(false) }}
            />
            <PromoteParticipantDialog
                open={promoteDialogOpen}
                onClose={() => { setPromoteDialogOpen(false) }}
            />
            <DataGrid
                sx={{
                    mb: "100px",
                    boxShadow: 5,
                    // border: 2,
                    // borderColor: 'primary.main',
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
                columns={participantColumn}
                rows={usersData}
                hideFooter
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Box>
    );
};
