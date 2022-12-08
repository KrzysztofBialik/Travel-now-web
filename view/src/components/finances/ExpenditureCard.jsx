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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import format from "date-fns/format";
import { DeleteExpenditureDialog } from "./DeleteExpenditureDialog";
import { EditExpenditureDialog } from "./EditExpenditureDialog";
import { doGet } from "../utils/fetch-utils";

export const ExpenditureCard = ({ expenditureData }) => {

    const { groupId } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const open = Boolean(anchorEl);


    const allContributors = expenditureData.contributors.map(ed => (
        <TableRow>
            <TableCell align="left">{ed.name}</TableCell>
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
                console.log(currency);
            })
            .then(setCurrencyLoading(false))
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getCurrency();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const editAction = () => {
        setEditDialogOpen(true);
        setAnchorEl(null);
    };

    const deleteAction = () => {
        setDeleteDialogOpen(true);
        setAnchorEl(null);
    };

    const closeWithDelete = () => {
        setDeleteDialogOpen(false);
        setDetailsDialogOpen(false);
    };

    const closeWithEdit = () => {
        setEditDialogOpen(false);
        setDetailsDialogOpen(false);
    };

    // PaperProps = {{ sx: { mt: "50px", verticalAlign: "top" } }

    return (
        <>
            <DeleteExpenditureDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                closeWithDelete={closeWithDelete}
            />
            <EditExpenditureDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                expenditureData={expenditureData}
                closeWithEdit={closeWithEdit}
            />
            <Dialog
                PaperProps={{
                    style: {
                        minHeight: "500px",
                        maxHeight: "500px",
                        width: "70%",
                        maxWidth: "400px",
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
                    }}
                >
                    <Box sx={{
                        width: "100%",
                        color: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography sx={{ fontSize: "28px" }}>
                            {expenditureData.title}
                        </Typography>
                        <Box>
                            {!expenditureData.debtors &&
                                <>
                                    <IconButton onClick={() => setEditDialogOpen(true)}>
                                        <EditIcon sx={{ color: "primary.main" }} />
                                    </IconButton>
                                    <IconButton onClick={() => setDeleteDialogOpen(true)}>
                                        <DeleteIcon sx={{ color: "error.main" }} />
                                    </IconButton>
                                </>
                            }
                            <IconButton sx={{ mr: -1 }} onClick={() => setDetailsDialogOpen(false)}>
                                <CloseIcon sx={{ color: "primary.main" }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        color: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        ml: -1
                    }}>
                        <AttachMoneyIcon sx={{ color: "primary.main", fontSize: "32px" }} />
                        <Typography sx={{ fontSize: "24px", color: "text.primary" }}>
                            {expenditureData.cost}
                        </Typography>
                        <Typography sx={{ fontSize: "24px", color: "text.primary" }}>
                            {currency}
                        </Typography>
                    </Box>
                </DialogTitle>
                <Box sx={{ width: "100%", backgroundColor: "primary.main" }}>
                    <Typography sx={{ fontSize: "24px", mx: 1 }}>
                        Contributors
                    </Typography>
                </Box>
                <Box sx={{ overflow: "auto" }}>
                    <TableContainer component={Paper} >
                        <Table size="small" >
                            <TableBody>
                                {/* <TableRow>
                                    <TableCell align="left">Krzychu77</TableCell>
                                </TableRow> */}
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