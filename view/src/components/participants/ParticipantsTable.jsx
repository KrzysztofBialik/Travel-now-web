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
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarColumnsButton } from '@mui/x-data-grid';
import { GridToolbarFilterButton } from '@mui/x-data-grid';
import { GridToolbarDensitySelector, } from '@mui/x-data-grid';
import { RemoveParticipantDialog } from './RemoveParticipantDialog';
import { PromoteParticipantDialog } from './PromoteParticipantDialog';
import { ParticipantsAvailabilityDialog } from '../availability/ParticipantsAvailabilityDialog';


export const usersData = [
    {
        id: 1,
        firstName: "Kajtek",
        surname: "Barański",
        email: "kajtek.boba@gmail.com",
        phoneNumber: "+48 254789631",
        role: "coordinator"
    },
    {
        id: 2,
        firstName: "Dorian",
        surname: "Bestrzyński",
        email: "dorek.best@gmail.com",
        phoneNumber: "+48 124798645",
        role: "participant"
    },
    {
        id: 3,
        firstName: "Krzysztof",
        surname: "Bialik",
        email: "krzychu77@gmail.com",
        phoneNumber: "+48 325647892",
        role: "participant"
    },
    {
        id: 4,
        firstName: "Piotr",
        surname: "Martin",
        email: "piter.martin@gmail.com",
        phoneNumber: "+48 214576842",
        role: "participant"
    },
    {
        id: 5,
        firstName: "Kajtek",
        surname: "Barański",
        email: "kajtek.boba@gmail.com",
        phoneNumber: "+48 214794623",
        role: "coordinator"
    },
    {
        id: 6,
        firstName: "Krzysztof",
        surname: "Bialik",
        email: "krzychu77@gmail.com",
        phoneNumber: "+48 214578964",
        role: "participant"
    },
    {
        id: 7,
        firstName: "Piotr",
        surname: "Martin",
        email: "piter.martin@gmail.com",
        phoneNumber: "+48 210354786",
        role: "participant"
    },
    {
        id: 8,
        firstName: "Kajtek",
        surname: "Barański",
        email: "kajtek.boba@gmail.com",
        phoneNumber: "+48 331024785",
        role: "coordinator"
    },
    {
        id: 9,
        firstName: "Krzysztof",
        surname: "Bialik",
        email: "krzychu77@gmail.com",
        phoneNumber: "+48 001247856",
        role: "participant"
    },
    {
        id: 10,
        firstName: "Piotr",
        surname: "Martin",
        email: "piter.martin@gmail.com",
        phoneNumber: "+48 214780312",
        role: "participant"
    },
    {
        id: 11,
        firstName: "Kajtek",
        surname: "Barański",
        email: "kajtek.boba@gmail.com",
        phoneNumber: "+48 111999542",
        role: "coordinator"
    },
    {
        id: 12,
        firstName: "Dorian",
        surname: "Bestrzyński",
        email: "dorek.best@gmail.com",
        phoneNumber: "+48 334778564",
        role: "participant"
    },
    {
        id: 13,
        firstName: "Krzysztof",
        surname: "Bialik",
        email: "krzychu77@gmail.com",
        phoneNumber: "+48 201475558",
        role: "participant"
    },
    {
        id: 14,
        firstName: "Piotr",
        surname: "Martin",
        email: "piter.martin@gmail.com",
        phoneNumber: "+48 201236457",
        role: "participant"
    },
];

export const availabilities = [
    {
        id: 1,
        startDate: new Date(2022, 10, 21),
        endDate: new Date(2022, 10, 27),
        user: "BoBa",
        disabled: true
    },
    {
        id: 2,
        startDate: new Date(2022, 11, 5),
        endDate: new Date(2022, 11, 9),
        user: "BoBa",
        disabled: true
    },
    {
        id: 3,
        startDate: new Date(2022, 11, 30),
        endDate: new Date(2023, 0, 4),
        user: "Piterm33",
        disabled: true
    },
    {
        id: 4,
        startDate: new Date(2023, 0, 6),
        endDate: new Date(2023, 0, 8),
        user: "Piterm33",
        disabled: true
    },
    {
        id: 5,
        startDate: new Date(2022, 11, 14),
        endDate: new Date(2022, 11, 18),
        user: "Piterm33",
        disabled: true
    },
    {
        id: 6,
        startDate: new Date(2022, 11, 14),
        endDate: new Date(2022, 11, 18),
        user: "Krzychu77",
        disabled: true
    },
    {
        id: 7,
        startDate: new Date(2023, 0, 5),
        endDate: new Date(2023, 0, 12),
        user: "Krzychu77",
        disabled: true
    },
    {
        id: 8,
        startDate: new Date(2022, 11, 10),
        endDate: new Date(2022, 11, 30),
        user: "Olisadebe",
        disabled: true
    }
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );
};


export const ParticipantsTable = ({ groupStage, isCoordinator }) => {
    const navigate = useNavigate();
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
    const [participantsAvailabilityDialogOpen, setParticipantsAvailabilityDialogOpen] = useState(false);
    const [usersAvailability, setUsersAvailability] = useState([]);
    const [username, setUsername] = useState("");

    const removeAction = () => {
        setRemoveDialogOpen(true);
    };

    const promoteAction = () => {
        setPromoteDialogOpen(true);
    };

    const checkParticipantsAvailability = ({ username, userAvailability }) => {
        setUsersAvailability(userAvailability);
        setUsername(username);
        setParticipantsAvailabilityDialogOpen(true);
    }

    const participantColumn = [
        {
            field: 'firstName', headerName: 'FIrstName', renderHeader: () => (
                <strong>
                    First Name
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
            field: 'email', headerName: 'Email', renderHeader: () => (
                <strong>
                    Email
                </strong>
            ), type: 'string', flex: 4, hideable: true, headerAlign: 'center', align: 'left', minWidth: 300,
        },
        {
            field: 'phoneNumber', headerName: 'PhoneNumber', renderHeader: () => (
                <strong>
                    Phone Number
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
                const username = params.row.username;
                const userAvailability = availabilities.filter(availability => (availability.user === params.row.username))

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
                                onClick={() => checkParticipantsAvailability({ username, userAvailability })}
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
                                onClick={() => checkParticipantsAvailability({ username, userAvailability })}
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
    ];


    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
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
                <ParticipantsAvailabilityDialog
                    open={participantsAvailabilityDialogOpen}
                    onClose={() => { setParticipantsAvailabilityDialogOpen(false) }}
                    usersAvailability={usersAvailability}
                    user={username}
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
        </>
    );
};
