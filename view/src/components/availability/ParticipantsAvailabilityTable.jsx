import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { gridClasses } from '@mui/x-data-grid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import StarIcon from '@mui/icons-material/Star';
import { ParticipantsAvailabilityDialog } from '../availability/ParticipantsAvailabilityDialog';
import { doGet } from "../../components/utils/fetch-utils";


export const ParticipantsAvailabilityTable = ({ groupStage, isCoordinator, groupId }) => {

    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [groupCoordinators, setGroupCoordinators] = useState([]);
    const [participantsAvailabilityDialogOpen, setParticipantsAvailabilityDialogOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [isDeletingHimself, setIsDeletingHimself] = useState(false);
    const [availabilities, setAvailabilities] = useState([]);
    const [usersAvailability, setUsersAvailability] = useState([]);
    const [userFullName, setUserFullName] = useState("");

    const getUsersData = async () => {
        await doGet('/api/v1/user-group/participants?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setUsersData(response))
            .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/user-group/coordinators?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setGroupCoordinators(response))
            .catch(err => console.log('Request Failed', err));
    };

    const getAvailabilities = async () => {
        await doGet('/api/v1/availability/group/' + groupId)
            .then(response => response.json())
            .then(response => {
                setAvailabilities(response);
            })
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getUsersData();
        getAvailabilities();
    }, []);

    const checkParticipantsAvailability = (userAvailability, userFullName) => {
        setUserFullName(userFullName);
        setUsersAvailability(userAvailability);
        setParticipantsAvailabilityDialogOpen(true);
    };

    const participantColumn = [
        {
            field: 'firstName', headerName: 'FirstName', sortable: false, renderHeader: () => (
                <strong>
                    First Name
                </strong>
            ), type: 'string', flex: 2, headerAlign: 'center', align: 'center', minWidth: 200, maxWidth: 350
        },
        {
            field: 'surname', headerName: 'Surname', sortable: false, renderHeader: () => (
                <strong>
                    Surname
                </strong>
            ), type: 'string', flex: 2, headerAlign: 'center', align: 'center', minWidth: 200, maxWidth: 350
        },
        {
            field: 'Availability', headerName: 'Availability', renderHeader: () => (
                <strong>
                    Availability
                </strong>
            ), type: 'actions', flex: 1, headerAlign: 'center', minWidth: 100,
            getActions: (params) => {
                const fullName = `${params.row.firstName} ${params.row.surname}`;
                const userId = params.row.userId;
                const role = params.row.role;
                const isSameUser = userId === parseInt(sessionStorage.getItem("userId"))
                const userAvailability = availabilities[userId];
                return [
                    <Button variant="contained"
                        sx={{
                            backgroundColor: "primary.main",
                            color: "#FFFFFF",
                            borderRadius: "20px",
                            mr: "20px"
                        }}
                        onClick={() => checkParticipantsAvailability(userAvailability, fullName)}
                    >
                        Show Availability
                    </Button>
                ]
            },
        },
    ];

    var userFullData = []
    const userWithRoles = () => {
        for (var i = 0; i < usersData.length; i++) {
            var user = {}
            let userId = usersData[i].userId;
            let firstName = usersData[i].firstName;
            let surname = usersData[i].surname;

            user['userId'] = userId;
            user['firstName'] = firstName;
            user['surname'] = surname;
            userFullData.push(user);
        }
    };

    userWithRoles();

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ParticipantsAvailabilityDialog
                    open={participantsAvailabilityDialogOpen}
                    onClose={() => { setParticipantsAvailabilityDialogOpen(false); setUsersAvailability([]); }}
                    usersAvailability={usersAvailability}
                    userFullName={userFullName}
                />
                <DataGrid
                    sx={{
                        mb: "100px",
                        boxShadow: 5,
                        px: 2,
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        [`& .${gridClasses.cell}`]: {
                            py: 1,
                            fontSize: "20px"
                        },
                        '& .MuiDataGrid-columnHeader': {
                            fontSize: "24px"
                        }
                    }}
                    getRowHeight={() => 'auto'}
                    autoHeight
                    columns={participantColumn}
                    rows={userFullData}
                    getRowId={row => row.userId}
                    hideFooter
                    loading={!userFullData.length}
                    disableColumnMenu
                />
            </Box>
        </>
    );
};
