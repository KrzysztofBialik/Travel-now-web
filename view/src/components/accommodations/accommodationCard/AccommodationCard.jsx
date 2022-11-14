import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOffIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LinkIcon from '@mui/icons-material/Link';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Slide } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';


// import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import { SelectAccommodationDialog } from "../SelectAccommodationDialog";
import { EditAccommodationDialog } from "../EditAccommodationDialog";
import { DeleteAccommodationDialog } from "../DeleteAccommodationDialog";


import "./AccommodationCard.css";


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

export const AccommodationCard = ({ accommodationData, canModify, selected }) => {

    function slideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [numOfVotes, setNumOfVotes] = useState(accommodationData.givenVotes);
    //dodanie tego czy zagłosował dany użytkownik, bo teraz jest zawsze false
    const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectDialogOpen, setSelectDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const open = Boolean(anchorEl);

    const voteAction = () => {
        setUserVote(!userVote)
        if (userVote) {
            setNumOfVotes(numOfVotes - 1);
        }
        else {
            setNumOfVotes(numOfVotes + 1);
        }
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
        setSelectDialogOpen(true);
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


    return (
        <>
            {/*---------------------------------------Opcja pierwsza--------------------------------------*/}
            {/* <Card
                sx={{
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflowWrap: "break-word",
                    backgroundClip: "border-box",
                    minHeight: "300px",
                    minWidth: "500px",
                }}
                elevation={16}
            >
                <Box
                    sx={{
                        mx: 2,
                        mt: -3,
                        py: 3,
                        px: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                        color: "#000000",
                        borderRadius: "0.5rem",
                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "black",
                                fontSize: "32px"
                            }}>
                            {accommodationData.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Added by: Coordinator
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            sx={{ color: "secondary.main" }}
                            onClick={voteAction}>
                            {userVote ? <ThumbUpIcon sx={{ fontSize: "30px" }} />
                                :
                                <ThumbUpOffIcon sx={{ fontSize: "30px" }} />

                            }
                        </Button>
                        <Typography
                            sx={{
                                color: "secondary.main",
                                fontSize: "20px"
                            }}
                        >
                            {numOfVotes}
                        </Typography>
                    </Box>
                </Box>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyItems: "center",
                                    height: "300px",
                                    width: "100%"
                                    // border: "2px solid black"
                                }}
                            // elevation={4}
                            >
                                <CardMedia
                                    component="img"
                                    image={accommodationData.imageLink}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    height: "200px"
                                    // minHeight: "300px"
                                    // border: "2px solid black"
                                }}
                            >
                                <Typography variant="h5">
                                    Address:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {accommodationData.address}
                                </Typography>
                                <Box>
                                    <GoogleMap
                                        zoom={14}
                                        center={{ lat: accommodationData.latitude, lng: accommodationData.longitude }}
                                        mapContainerClassName="map-container"
                                        mapContainerStyle={{ height: "230px" }}
                                    >
                                        <MarkerF position={{ lat: accommodationData.latitude, lng: accommodationData.longitude }} />
                                    </GoogleMap>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: "100px", mx: "50px" }}>
                        <Button variant="outlined" sx={{ borderRadius: "20px" }}>
                            <LinkIcon />
                            <Typography mx={"5px"}>
                                Link
                            </Typography>
                        </Button>
                        <Button variant="outlined" sx={{ borderRadius: "20px" }}>
                            <EmojiTransportationIcon />
                            <Typography mx={"5px"}>
                                Transport
                            </Typography>
                        </Button>
                    </Box>
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
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {accommodationData.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card> */}

            {/*---------------------------------------Opcja druga--------------------------------------*/}
            {/* <Grid item xs={12} md={6}> */}
            <SelectAccommodationDialog
                open={selectDialogOpen}
                onClose={() => {
                    setSelectDialogOpen(false);
                }}
            />
            <EditAccommodationDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                }}
            />
            <DeleteAccommodationDialog
                open={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                }}
            />
            <Card
                sx={{ height: "100%" }}
                elevation={10}
            >
                <CardHeader
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                        backgroundColor: selected ? "secondary.main" : "primary.main",
                        // background: "linear-gradient(195deg, rgb(255, 224, 130), rgb(255, 201, 40))",
                        // backgroundColor: "secondary.main",
                        color: "#000000",
                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                    }}
                    title={accommodationData.name}
                    titleTypographyProps={{ variant: 'h5' }}
                    subheader="Added by: Coordinator"
                    subheaderTypographyProps={{ variant: 'body2' }}
                    action={
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Button
                                    sx={{ color: selected ? "primary.main" : "secondary.main" }}
                                    onClick={voteAction}>
                                    {userVote ? <ThumbUpIcon sx={{ fontSize: "30px" }} />
                                        :
                                        <ThumbUpOffIcon sx={{ fontSize: "30px", padding: 0 }} />

                                    }
                                </Button>
                                <Typography
                                    sx={{
                                        color: selected ? "primary.main" : "secondary.main",
                                        fontSize: "20px",
                                        padding: 0
                                    }}
                                >
                                    {numOfVotes}
                                </Typography>
                            </Box>
                            {canModify && <Box>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    sx={{
                                        color: selected ? "primary.main" : "secondary.main",
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
                                    <MenuItem onClick={() => selectAction()}>
                                        <DoneIcon sx={{ mr: "20px", color: "primary.main" }} />
                                        <Typography sx={{ color: "primary.main" }}>
                                            Select
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
                    }
                >
                </CardHeader>
                <CardMedia
                    component="img"
                    image={accommodationData.imageLink}
                    alt="Paella dish"
                    sx={{
                        height: "250px",
                        // backgroundRepeat: "no-repeat",
                        // backgroundSize: "cover"
                    }}
                />
                <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <Box>
                        <Typography variant="h5">
                            Address:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {accommodationData.address}
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: "100px", ml: 5 }}>
                        <Typography variant="h5">
                            Price:
                        </Typography>
                        <Typography variant="h5" color="primary.main">
                            {accommodationData.price} zł
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexWrap: "wrap",
                        // flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={accommodationData.sourceLink}
                        >
                            <Button variant="outlined"
                                sx={{
                                    borderRadius: "20px",
                                    '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main" }
                                }}
                            >
                                <LinkIcon />
                                <Typography mx={"5px"}>
                                    Link
                                </Typography>
                            </Button>
                        </a>
                        <Button variant="outlined"
                            sx={{
                                borderRadius: "20px",
                                '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main" }
                            }}
                        >
                            <EmojiTransportationIcon />
                            <Typography mx={"5px"}>
                                Transport
                            </Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignSelf: "center" }}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon sx={{ color: "primary.main", mx: "5px" }} />
                        </ExpandMore>
                    </Box>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {accommodationData.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card >
            {/* </Grid> */}
        </>
    )
}