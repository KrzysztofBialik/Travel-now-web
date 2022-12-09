import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Paper } from '@mui/material';
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Table } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { ButtonBase } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import format from "date-fns/format";
import { doGet } from "../utils/fetch-utils";

export const ExpenditureCard = ({ expenditureData }) => {

    const { groupId } = useParams();
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const allContributors = expenditureData.contributors.map(ed => (
        <TableRow key={ed.name}>
            <TableCell align="left" sx={{ fontSize: "18px" }}>{ed.name}</TableCell>
        </TableRow>
    )
    );

    const getCurrency = async () => {
        setCurrencyLoading(true);
        var resp = await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var currency = response.currency;
                setCurrency(currency);
            })
            .then(setCurrencyLoading(false))
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getCurrency();
    }, []);

    return (
        <>
            <Dialog
                PaperProps={{
                    style: {
                        borderRadius: "20px",
                        minHeight: "300px",
                        maxHeight: "500px",
                        minWidth: "500px",
                        maxWidth: "600px",
                        overflow: "hidden"
                        // minWidth: "700px"
                    }
                }}
                open={detailsDialogOpen}
                onClose={() => setDetailsDialogOpen(false)}
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
                            Expenditure details
                        </Typography>
                        <Box>
                            <IconButton sx={{ mr: -1 }} onClick={() => setDetailsDialogOpen(false)}>
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
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#dee2e6",
                    "&:hover": {
                        borderColor: "primary.main",
                    }
                }}
            >
                <ButtonBase
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "100px",
                        maxHeight: "100px",
                        px: "20px"
                    }}
                    onClick={() => setDetailsDialogOpen(true)}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "22px", color: "text.primary", mr: 2 }}>
                                {expenditureData.title}
                            </Typography>
                            {expenditureData.debtors && <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Typography sx={{ color: "secondary.main", fontSize: "28px" }}>-</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <PaidIcon sx={{ color: "secondary.main", fontSize: "28px" }} />
                                </Box>
                            </Box>}
                        </Box>
                        <Typography sx={{ fontSize: "16px", color: "text.secondary" }}>
                            {expenditureData.person}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", ml: 2 }}>
                            <Typography sx={{ fontSize: "24px", color: "primary.main" }}>
                                {currencyLoading ? <CircularProgress size="24px" sx={{ ml: 2, mt: 1 }} /> : `${expenditureData.cost} ${currency}`}
                            </Typography>
                            <Typography sx={{ fontSize: "18px", color: "text.secondary" }}>
                                {format(expenditureData.date, "dd.MM.yyyy")}
                            </Typography>
                        </Box>
                    </Box>
                </ButtonBase>
            </Card>
        </>
    );
};