import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Collapse } from "@mui/material";
import { CardActions } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import CheckIcon from '@mui/icons-material/Check';

import { SelectStartingPointDialog } from "./SelectStartingPointDialog";
import { EditAttractionDialog } from "./EditAttractionDialog";
import { DeleteAttractionDialog } from "./DeleteAttractionDialog";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const AttractionCard = ({ attractionData, canModify }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [selectStartingPointDialogOpen, setSelectStartingPointDialogOpen] = useState(false);
    const [editAttractionDialogOpen, setEditAttractionDialogOpen] = useState(false);
    const [deleteAttractionDialogOpen, setDeleteAttractionDialogOpen] = useState(false);
    const [mapsLink, setMapsLink] = useState(attractionData.attractionLink)
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

    const selectAction = () => {
        setSelectStartingPointDialogOpen(true);
        setAnchorEl(null);
    };

    const editAction = () => {
        setEditAttractionDialogOpen(true);
        setAnchorEl(null);
    };

    const deleteAction = () => {
        setDeleteAttractionDialogOpen(true);
        setAnchorEl(null);
    };

    var getPhotoUrl = (photoReference) => {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }

    return (
        <>
            {/* <SelectStartingPointDialog
                open={selectStartingPointDialogOpen}
                onClose={() => setSelectStartingPointDialogOpen(false)}
            />
            <EditAttractionDialog
                open={editAttractionDialogOpen}
                onClose={() => setEditAttractionDialogOpen(false)}
                attractionData={attractionData}
            />
            <DeleteAttractionDialog
                open={deleteAttractionDialogOpen}
                onClose={() => setDeleteAttractionDialogOpen(false)}
            /> */}
            <Card
                sx={{ height: "100%", width: "100%", maxWidth: "100%", borderRadius: "10px" }}
                elevation={5}
            >
                {/* <CardMedia
                    component="img"
                    image={attractionData.imageLink}
                    alt="Paella dish"
                    sx={{
                        height: "250px",
                        // backgroundRepeat: "no-repeat",
                        // backgroundSize: "cover"
                    }}
                /> */}
                <CardContent >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyCOntent: "space-between", width: "100%", columnGap: "20px" }}>
                        <Box sx={{ width: "40%" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    height: "200px",
                                    width: "100%"
                                }}
                            >
                                <CardMedia
                                    sx={{ borderRadius: "10px" }}
                                    component="img"
                                    image={getPhotoUrl(attractionData.photoLink)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "55%", minHeight: "200px" }}>
                            <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box sx={{ mb: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <Typography
                                            sx={{
                                                color: "black",
                                                fontSize: "32px",
                                            }}>
                                            {attractionData.name}
                                        </Typography>
                                        {canModify && <Box sx={{ mr: "-10px" }}>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={open ? 'long-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                                sx={{
                                                    color: "primary.main",
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
                                                <MenuItem onClick={selectAction}>
                                                    <CheckIcon sx={{ mr: "20px", color: "primary.main" }} />
                                                    <Typography sx={{ color: "primary.main" }}>
                                                        Starting point
                                                    </Typography>
                                                </MenuItem>
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
                                    <Typography variant="body2" color="text.secondary">
                                        {attractionData.address}
                                    </Typography>

                                </Box>
                                <Box sx={{ alignSelf: "flex-start" }}>
                                    <Button
                                        variant="outlined"
                                        target="_blank"
                                        rel="noreferrer"
                                        href={mapsLink}
                                        sx={{
                                            // mt: 11,
                                            borderRadius: "20px",
                                            width: "180px",
                                            '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main" }
                                        }}
                                    >
                                        <MapIcon sx={{ mr: "10px" }} />
                                        See in maps
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "center",
                        flexWrap: "wrap",
                        mt: -8,
                        mb: 1,
                        ml: 1
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", width: "50%" }}>
                        <Box mx="10px">
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon sx={{ color: "primary.main" }} />
                            </ExpandMore>
                        </Box>
                    </Box>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {attractionData.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card >
        </>
    );
};