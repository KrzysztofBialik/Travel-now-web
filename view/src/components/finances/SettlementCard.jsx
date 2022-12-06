import { useState } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Paper } from '@mui/material';
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { ButtonBase } from "@mui/material";
import { DialogContent } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import HandshakeIcon from '@mui/icons-material/Handshake';
import format from "date-fns/format";

import { ResolveSettlementDialog } from "./ResolveSettlementDialog";


export const SettlementCard = ({ settlementData, canResolve, groupId, requestId, onSuccess }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [resolveSettlementDialogOpen, setResolveSettlementDialogOpen] = useState(false);
    const [isResolved, setIsResolved] = useState(!canResolve);
    const [updatedData, setUpdatedData] = useState(settlementData);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleResolve = () => {
        setResolveSettlementDialogOpen(false);
        setIsResolved(true);
        setUpdatedData(({ ...settlementData, status: "RESOLVED" }));
    };

    const resolveAction = () => {
        setAnchorEl(null);
        setResolveSettlementDialogOpen(true);
    };

    // PaperProps = {{ sx: { mt: "50px", verticalAlign: "top" } }

    return (
        <>
            <ResolveSettlementDialog
                open={resolveSettlementDialogOpen}
                onClose={() => (setResolveSettlementDialogOpen(false))}
                handleResolve={handleResolve}
                groupId={groupId}
                requestId={requestId}
                onSuccess={() => onSuccess()}
            />
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
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "100px",
                        maxHeight: "100px",
                        px: 2
                    }}
                >
                    <Box sx={{ my: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography sx={{ fontSize: "20px", color: "text.primary" }}>
                            {updatedData.debtor}
                        </Typography>
                        <Typography sx={{ fontSize: "16px", color: "text.secondary" }}>
                            owes
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "text.primary" }}>
                            {updatedData.debtee}
                        </Typography>
                    </Box>
                    <Box sx={{ height: "100px", my: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <Box>
                            {!isResolved && <Box sx={{ mr: -1 }}>
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
                                    <MenuItem onClick={resolveAction}>
                                        <HandshakeIcon sx={{ mr: "20px", color: "primary.main" }} />
                                        <Typography sx={{ color: "primary.main" }}>
                                            Resolve
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>}
                        </Box>
                        <Typography sx={{ fontSize: "24px", color: "primary.main", mb: 1 }}>
                            {updatedData.amount} PLN
                        </Typography>
                        <Typography sx={{ fontSize: "16px", color: "secondary.main" }}>
                            {updatedData.status}
                        </Typography>
                    </Box>
                    {/* <Box sx={{ height: "100px", my: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: canResolve ? "space-between" : "flex-end" }}>
                        {canResolve && <Box sx={{ mr: -1 }}>
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
                                <MenuItem >
                                    <HandshakeIcon sx={{ mr: "20px", color: "primary.main" }} />
                                    <Typography sx={{ color: "primary.main" }}>
                                        Resolve
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>}
                        <Typography sx={{ fontSize: "24px", color: "primary.main", mb: 1 }}>
                            {settlementData.amount} PLN
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "secondary.main" }}>
                            {settlementData.status}
                        </Typography>
                    </Box> */}
                </Box>
            </Card>
        </>
    );
};