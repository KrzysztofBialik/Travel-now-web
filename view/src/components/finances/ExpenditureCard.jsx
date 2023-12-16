import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ButtonBase } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import format from "date-fns/format";
import { doGet } from "../utils/fetch-utils";
import { DeleteExpenditureDialog } from "./DeleteExpenditureDialog";
import { ExpenditureInfoDialog } from "./ExpenditureInfoDialog";
import { EditExpenditureDialog } from "./EditExpenditureDialog";

export const ExpenditureCard = ({ expenditureData, canModify, participants, onSuccess, onDeletion }) => {

    const { groupId } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteExpenditureDialogOpen, setDeleteExpenditureDialogOpen] = useState(false);
    const [expenditureInfoDialogOpen, setExpendItureInfoDalogOpen] = useState(false);
    const [editExpenditureDialogOpen, setEditExpenditureDialogOpen] = useState(false);
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const infoAction = () => {
        setAnchorEl(null);
        setExpendItureInfoDalogOpen(true);
    };

    const editAction = () => {
        setAnchorEl(null);
        setEditExpenditureDialogOpen(true);
    };

    const deleteAction = () => {
        setAnchorEl(null);
        setDeleteExpenditureDialogOpen(true);
    };

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
        // console.log(expenditureData);
    }, []);

    return (
        <>
            <ExpenditureInfoDialog
                open={expenditureInfoDialogOpen}
                onClose={() => setExpendItureInfoDalogOpen(false)}
                expenditureData={expenditureData}
                currency={currency}
            />
            <EditExpenditureDialog
                open={editExpenditureDialogOpen}
                onClose={() => setEditExpenditureDialogOpen(false)}
                expenditureData={expenditureData}
                participants={participants}
                currency={currency}
                groupId={groupId}
                onSuccess={() => onSuccess()}
            />
            <DeleteExpenditureDialog
                open={deleteExpenditureDialogOpen}
                onClose={() => setDeleteExpenditureDialogOpen(false)}
                expenditureId={expenditureData.id}
                groupId={groupId}
                onSuccess={() => onSuccess()}
            />
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    px: "20px",
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
                    <Box sx={{ height: "100px", my: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <Box>
                            <Box sx={{ mr: -1 }}>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    sx={{
                                        color: "secondary.main",
                                        padding: 0,
                                    }}
                                >
                                    <MoreVertIcon sx={{ fontSize: "30px" }} />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={infoAction}>
                                        <InfoIcon sx={{ mr: "20px", color: "primary.main" }} />
                                        <Typography sx={{ color: "primary.main" }}>
                                            Info
                                        </Typography>
                                    </MenuItem>
                                    {canModify ?
                                        <Box>
                                            <MenuItem onClick={editAction}>
                                                <EditIcon sx={{ mr: "20px", color: "primary.main" }} />
                                                <Typography sx={{ color: "primary.main" }}>
                                                    Edit
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem onClick={deleteAction}>
                                                <DeleteIcon sx={{ mr: "20px", color: "error.main" }} />
                                                <Typography sx={{ color: "error.main" }}>
                                                    Delete
                                                </Typography>
                                            </MenuItem>
                                        </Box>
                                        :
                                        <Box></Box>
                                    }
                                </Menu>
                            </Box>
                        </Box>
                        <Typography sx={{ fontSize: "24px", color: "primary.main" }}>
                            {currencyLoading ? <CircularProgress size="24px" sx={{ ml: 2, mt: 1 }} /> : `${expenditureData.cost} ${currency}`}
                        </Typography>
                        <Typography sx={{ fontSize: "18px", color: "text.secondary" }}>
                            {format(expenditureData.date, "dd.MM.yyyy")}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
};