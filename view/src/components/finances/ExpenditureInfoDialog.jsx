import { useState } from "react";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { IconButton } from "@mui/material";
import { Paper } from '@mui/material';
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableRow } from "@mui/material";
import { Typography } from "@mui/material";

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';


export const ExpenditureInfoDialog = ({ open, onClose, expenditureData, currency }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const allContributors = expenditureData.contributors.map(ed => (
        <TableRow key={ed.name}>
            <TableCell align="left" sx={{ fontSize: "18px" }}>{ed.name}</TableCell>
        </TableRow>
    )
    );

    return (
        <>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Settlement resolved." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                PaperProps={{
                    style: {
                        borderRadius: "20px",
                        minHeight: "300px",
                        maxHeight: "500px",
                        minWidth: "500px",
                        maxWidth: "600px",
                        overflow: "hidden"
                    }
                }}
                open={open}
                onClose={onClose}
            >
                <DialogTitle
                    sx={{
                        color: "primary.main",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "primary.main",
                        py: 1
                    }}
                >
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography sx={{ fontSize: "24px", color: "#FFFFFF" }}>
                            Expenditure info
                        </Typography>
                        <Box>
                            <IconButton sx={{ mr: -1 }} onClick={onClose}>
                                <CloseIcon sx={{ color: "secondary.main" }} />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <Box sx={{
                    width: "100%",
                    color: "primary.main",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    ml: 3,
                    mt: 2
                }}>
                    <Typography sx={{ fontSize: "32px" }}>
                        {expenditureData.title}
                    </Typography>
                </Box>
                <Box sx={{
                    width: "100%",
                    color: "primary.main",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    ml: 2
                }}>
                    <AttachMoneyIcon sx={{ color: "primary.main", fontSize: "20px" }} />
                    <Typography sx={{ fontSize: "20px", color: "text.primary", mr: "3px" }}>
                        {expenditureData.cost}
                    </Typography>
                    <Typography sx={{ fontSize: "20px", color: "text.primary" }}>
                        {currency}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", backgroundColor: "#dee2e6", mt: 2 }}>
                    <Typography sx={{ fontSize: "24px", mx: 1, color: "#000000" }}>
                        Contributors
                    </Typography>
                </Box>
                <Box sx={{ overflow: "auto" }}>
                    <TableContainer component={Paper} >
                        <Table size="small" >
                            <TableBody>
                                {allContributors}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Dialog>
        </>
    )
}