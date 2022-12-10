import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { doGet } from "../utils/fetch-utils";
import { ResolveSettlementDialog } from "./ResolveSettlementDialog";


export const SettlementCard = ({ settlementData, canResolve, requestId, onSuccess }) => {

    const { groupId } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const [resolveSettlementDialogOpen, setResolveSettlementDialogOpen] = useState(false);
    const [isResolved, setIsResolved] = useState(!canResolve);
    const [updatedData, setUpdatedData] = useState(settlementData);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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
    }, []);

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
                            {currencyLoading ? <CircularProgress size="24px" sx={{ ml: 2, mt: 1 }} /> : `${updatedData.amount} ${currency}`}
                        </Typography>
                        <Typography sx={{ fontSize: "16px", color: "secondary.main" }}>
                            {updatedData.status}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
};