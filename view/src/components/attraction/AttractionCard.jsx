import { useState } from "react";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Collapse } from "@mui/material";
import { CardActions } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import CheckIcon from '@mui/icons-material/Check';
import { SelectStartingPointDialog } from "./SelectStartingPointDialog";
import { EditAttractionDialog } from "./EditAttractionDialog";
import { DeleteAttractionDialog } from "./DeleteAttractionDialog";
import { PLACEHOLDER_IMAGE } from "../images/Images";
import { doGet } from "../utils/fetch-utils";


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

export const AttractionCard = ({ attractionData, groupId, id, onDeletion }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [selectStartingPointDialogOpen, setSelectStartingPointDialogOpen] = useState(false);
    const [editAttractionDialogOpen, setEditAttractionDialogOpen] = useState(false);
    const [deleteAttractionDialogOpen, setDeleteAttractionDialogOpen] = useState(false);
    const [mapsLink, setMapsLink] = useState(attractionData.attractionLink);
    const open = Boolean(anchorEl);
    const [isCoordinator, setIsCoordinator] = useState(false)

    useEffect(() => {
        isCorinator();
    }, []);

    const isCorinator = async () => {
        var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
            .catch(err => console.log(err.message));
        var body = await resp.json();
        setIsCoordinator(body);
    };


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
    };

    const removeMenus = () => {
        setAnchorEl(null);
    };

    window.addEventListener('scroll', removeMenus);

    return (
        <>
            <SelectStartingPointDialog
                open={selectStartingPointDialogOpen}
                onClose={() => setSelectStartingPointDialogOpen(false)}
                dayPlanId={id}
                attractionId={attractionData.attractionId}
            />
            <EditAttractionDialog
                open={editAttractionDialogOpen}
                onClose={() => setEditAttractionDialogOpen(false)}
                attractionData={attractionData}
            />
            <DeleteAttractionDialog
                open={deleteAttractionDialogOpen}
                onClose={() => setDeleteAttractionDialogOpen(false)}
                dayPlanId={id}
                attractionId={attractionData.attractionId}
                onSuccess={(id) => onDeletion(id)}
            />
            <Card
                sx={{ height: "100%", width: "100%", maxWidth: "100%", borderRadius: "20px" }}
                elevation={5}
            >
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
                                    sx={{ borderRadius: "15px" }}
                                    component="img"
                                    image={attractionData.photoLink !== null ? getPhotoUrl(attractionData.photoLink) : PLACEHOLDER_IMAGE}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "55%",
                                minHeight: "200px",
                                maxHeight: "200px"
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "75%",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            minHeight: "30%",
                                            maxHeight: "70%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "black",
                                                fontSize: "28px",
                                                display: "-webkit-box",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: "2",
                                                WebkitBoxOrient: "vertical"
                                            }}
                                        >
                                            {attractionData.name}
                                        </Typography>
                                        {isCoordinator && <Box sx={{ mr: "-10px" }}>
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
                                                disableScrollLock={true}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
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
                                                    <DeleteIcon sx={{ mr: "20px", color: "error.main" }} />
                                                    <Typography sx={{ color: "error.main" }}>
                                                        Delete
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Box>}
                                    </Box>
                                    <Box sx={{ height: "30%" }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            align="left"
                                            sx={{
                                                display: "-webkit-box",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: "2",
                                                WebkitBoxOrient: "vertical"
                                            }}
                                        >
                                            {attractionData.address}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        height: "25%",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-end"
                                    }}
                                >
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
                            {attractionData.description.length === 0 ?
                                "No description provided" :
                                attractionData.description
                            }
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card >
        </>
    );
};