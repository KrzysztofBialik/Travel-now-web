import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const userData = [
    {
        id: 1,
        firstName: "Robert",
        lastName: "Lewandowski",
        username: "robciu",
        role: "Coordinator"
    },
    {
        id: 2,
        firstName: "Marcin",
        lastName: "Cebula",
        username: "sędzia",
        role: "Participant"
    },
    {
        id: 3,
        firstName: "Kamila",
        lastName: "Marchlewicz",
        username: "kamilka",
        role: "Participant"
    },
    {
        id: 4,
        firstName: "Jakub",
        lastName: "Zastępczy",
        username: "nauczyciel",
        role: "Participant"
    },
    {
        id: 5,
        firstName: "Zuzia",
        lastName: "Siemaszko",
        username: "stocznik",
        role: "Participant"
    }
]

export const ParticipantsTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 20 }} align="center">First Name</TableCell>
                        <TableCell sx={{ fontSize: 20 }} align="center">Last Name</TableCell>
                        <TableCell sx={{ fontSize: 20 }} align="center">Username</TableCell>
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
                            <TableCell align="center">{user.username}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}