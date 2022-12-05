import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { doGet } from '../utils/fetch-utils';
import { useState } from 'react';


const userData = [
    {
        id: 1,
        firstName: "Robert",
        lastName: "Lewandowski",
        phoneNumber: "+48 111222333",
        role: "Coordinator"
    },
    {
        id: 2,
        firstName: "Marcin",
        lastName: "Cebula",
        phoneNumber: "+48 444555666",
        role: "Participant"
    },
    {
        id: 3,
        firstName: "Kamila",
        lastName: "Marchlewicz",
        phoneNumber: "+48 777888999",
        role: "Participant"
    },
    {
        id: 4,
        firstName: "Jakub",
        lastName: "Zastępczy",
        phoneNumber: "+48 123456789",
        role: "Participant"
    },
    {
        id: 5,
        firstName: "Zuzia",
        lastName: "Siemaszko",
        phoneNumber: "+48 987456123",
        role: "Participant"
    }
]

export const ParticipantsTable = (groupId) => {
    const [usersData, setUsersData] = useState([]);
    const [groupCoordinators, setGroupCoordinators] = useState([]);

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

    useEffect(() => {
        getUsersData();
    })
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 20 }} align="center">First Name</TableCell>
                        <TableCell sx={{ fontSize: 20 }} align="center">Last Name</TableCell>
                        <TableCell sx={{ fontSize: 20 }} align="center">Phone number</TableCell>
                        <TableCell sx={{ fontSize: 20 }} align="center">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{user.firstName}</TableCell>
                            <TableCell align="left">{user.lastName}</TableCell>
                            <TableCell align="center">{user.phoneNumber}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
