import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
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
import { doGet } from "../../components/utils/fetch-utils";

import { get } from 'react-hook-form';
import { useEffect } from 'react';

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


export const ParticipantsTable = ({ groupStage, isCoordinator, groupId }) => {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [groupCoordinators, setGroupCoordinators] = useState([]);

    localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6IkRvcmlhbiJ9.spFruljGVOCA2_CVdl4nP36AcWeKy2YvEIQ5aYoqrxw")
    localStorage.setItem("userId", 31)

    const getUsersData = async () => {
        await doGet('/api/v1/user-group/participants?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(response => setUsersData(response))
        .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/user-group/coordinators?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(response => setGroupCoordinators(response))
        .catch(err => console.log('Request Failed', err));
    }
  
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
    const [participantsAvailabilityDialogOpen, setParticipantsAvailabilityDialogOpen] = useState(false);
    const [usersAvailability, setUsersAvailability] = useState([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [isDeletingHimself, setIsDeletingHimself] = useState(false);

    useEffect(() => {
        getUsersData();
      }, [])


      const removeAction = (userId) => {

        if(userId === parseInt(localStorage.getItem("userId"))) {
            setIsDeletingHimself(true);
        }
        setUserId(userId);
        setRemoveDialogOpen(true);
    };

    const promoteAction = (userId) => {
        setUserId(userId);
        setPromoteDialogOpen(true);
    };


    const checkParticipantsAvailability = ({ username, userAvailability }) => {
        setUsersAvailability(userAvailability);
        setUsername(username);
        setParticipantsAvailabilityDialogOpen(true);
    }

    const participantColumn = [
        {

            field: 'firstName', headerName: 'FirstName', renderHeader: () => (
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
            field: 'phoneNumber', headerName: 'Phone Number', renderHeader: () => (
                <strong>
                    Phone Number
                </strong>
            ), type: 'string', flex: 1, hideable: true, headerAlign: 'center', align: 'left', minWidth: 200,
        },
        {

            field: 'email', headerName: 'Mail', renderHeader: () => (
                <strong>
                    Mail
                </strong>
            ), type: 'string', flex: 2, hideable: true, headerAlign: 'center', align: 'left', minWidth: 250,
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
                const userId = params.row.userId;
                const role = params.row.role;
                const isSameUser = userId === parseInt(localStorage.getItem("userId"))
                const userAvailability = availabilities.filter(availability => (availability.user === params.row.username))
                if (isCoordinator) {
                if(groupStage === "PLANNING_STAGE") {
                    if (role === "PARTICIPANT") {
                        return [
                            <GridActionsCellItem 
                                icon={<DeleteIcon sx={{ color: "primary.main" }} />}
                                label= "Remove from group"
                                onClick={() => removeAction(userId)}
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
                                onClick={() => promoteAction(userId)}
                                showInMenu
                            />
                        ];
                    }
                    else if(role === "COORDINATOR" && !isSameUser) {
                        return [
                            <GridActionsCellItem 
                                icon={<DeleteIcon sx={{ color: "primary.main" }} />}
                                label= "Remove from group"
                                onClick={() => removeAction(userId)}
                                showInMenu
                            />,
                            <GridActionsCellItem
                                icon={<EventAvailableIcon sx={{ color: "primary.main" }} />}
                                label="Check availability"
                                onClick={() => checkParticipantsAvailability({ username, userAvailability })}
                                showInMenu
                            />
                        ];

                    }
                    else if(role === "COORDINATOR" && isSameUser) {
                        return [
                            <GridActionsCellItem 
                                icon={<DeleteIcon sx={{ color: "primary.main" }} />}
                                label= "Leave a group"
                                onClick={() => removeAction(userId)}
                                showInMenu
                            />,
                            <GridActionsCellItem
                                icon={<EventAvailableIcon sx={{ color: "primary.main" }} />}
                                label="Check availability"
                                onClick={() => checkParticipantsAvailability({ username, userAvailability })}
                                showInMenu
                            />
                        ];

                    }
                }
                    else {
                        if(role === "COORDINATOR"){
                        return [
                            <GridActionsCellItem
                                icon={<CurrencyExchangeIcon sx={{ color: "primary.main" }} />}
                                label="Check expenses"
                                onClick={() => { navigate("/expenses") }}
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
                                onClick={() => promoteAction(userId)}
                                showInMenu
                            />
                        ];
                    }
                }
            }
                else {
                    if (groupStage === "PLANNING_STAGE") {
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

    var userFullData = []
    const userWithRoles = () => {
        for(var i = 0 ; i < usersData.length; i++) {
            var user = {}
            let userId = usersData[i].userId;
            let firstName = usersData[i].firstName;
            let surname = usersData[i].surname;
            let phoneNumber = usersData[i].phoneNumber;
            let email = usersData[i].email;
            let role;
            
            if(groupCoordinators.some(coordinator => coordinator.userId === usersData[i].userId)){
                role = "COORDINATOR"
            }
            else {
                role = "PARTICIPANT";
            }
            user['userId'] = userId;
            user['firstName'] = firstName;
            user['surname'] = surname;
            user['phoneNumber'] = phoneNumber;
            user['email'] = email;
            user['role'] = role;
            userFullData.push(user);
        }
    }

    userWithRoles();
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
                    groupId={groupId}
                    userId={userId}
                    isDeletingHimself={isDeletingHimself}
                    onSuccess={() => getUsersData()}
                />
                <PromoteParticipantDialog
                    open={promoteDialogOpen}
                    onClose={() => { setPromoteDialogOpen(false) }}
                    groupId={groupId}
                    userId={userId}
                    onSuccess={() => getUsersData()}
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
                    rows={userFullData}
                    getRowId={row => row.userId}
                    hideFooter
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </Box>
        </>
    );
};
