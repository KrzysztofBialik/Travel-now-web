import { useState } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ButtonBase } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChurchIcon from '@mui/icons-material/Church';
import CastleIcon from '@mui/icons-material/Castle';
import SailingIcon from '@mui/icons-material/Sailing';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

import { DeleteDayPlanDialog } from "./DeleteDayPlanDialog";
import { EditDayPlanDialog } from "./EditDayPlanDialog";


const icons = [
    {
        id: 1,
        value: 1,
        icon: <ChurchIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 2,
        value: 2,
        icon: <CastleIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 3,
        value: 3,
        icon: <SailingIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 4,
        value: 4,
        icon: <LocationCityIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 5,
        value: 5,
        icon: <DirectionsWalkIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 6,
        value: 6,
        icon: <WaterIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 7,
        value: 7,
        icon: <LandscapeIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 8,
        value: 8,
        icon: <RestaurantIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
    {
        id: 9,
        value: 9,
        icon: <DownhillSkiingIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
    },
];

export const DayPlanCard = ({ dayPlanData, canModify, showDetailedPlan, onSuccess }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    const dayPlanIcon = icons.filter(icon => icon.id === dayPlanData.iconType).map(icon =>
        <Box key={icon.id}>
            {icon.icon}
        </Box>);

    return (
        <>
            <EditDayPlanDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                dayPlanData={dayPlanData}
                onSuccess={() => onSuccess()}
            />
            <DeleteDayPlanDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                dayPlanId={dayPlanData.dayPlanId}
                onSuccess={() => onSuccess()}
            />

            <Card
                sx={{
                    width: "100%",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "primary.light"
                    }
                }}>
                <ButtonBase
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    onClick={() => showDetailedPlan(dayPlanData.name, dayPlanData.date, dayPlanData.dayAttractions, dayPlanData.dayPlanId)}
                >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {dayPlanIcon}
                        <ListItemText
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start"
                            }}
                            primary={dayPlanData.name}
                            secondary={dayPlanData.date}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                            sx={{
                                color: "secondary.main",
                                fontSize: "20px",
                                padding: 0
                            }}
                        >
                            {dayPlanData.numberOfAttractions}
                        </Typography>
                        <LocationOnIcon sx={{ color: "secondary.main", fontSize: "28px" }} />
                    </Box>
                </ButtonBase>
                <Box sx={{
                    display: "flex", flexDirection: "row", alignItems: "center", mr: 1, my: 1
                }}>
                    {canModify && <Box >
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            sx={{
                                color: "secondary.main",
                                padding: 0
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
                            <MenuItem onClick={editAction}>
                                <EditIcon sx={{ mr: "20px", color: "primary.main" }} />
                                <Typography sx={{ color: "primary.main" }}>
                                    Edit
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={deleteAction}>
                                <DeleteIcon sx={{ mr: "20px", color: "primary.main" }} />
                                <Typography sx={{ color: "primary.main" }}>
                                    Delete
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>}
                </Box>
            </Card>
        </>
    );
};