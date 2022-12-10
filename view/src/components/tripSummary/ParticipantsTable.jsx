import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const ParticipantsTable = ({ userData }) => {

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
                            key={user.userId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{user.firstName}</TableCell>
                            <TableCell align="center">{user.surname}</TableCell>
                            <TableCell align="center">{user.phoneNumber}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
