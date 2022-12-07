import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Card, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
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
import { SelectAccommodationDialog } from "../SelectAccommodationDialog";
import { EditAccommodationDialog } from "../EditAccommodationDialog";
import { DeleteAccommodationDialog } from "../DeleteAccommodationDialog";
import { TransportDialog } from "../../transport/TransportDialog";
import { NoDatesSelectedDialog } from "../NoDatesSelectedDialog";
import "./AccommodationCard.css";
import { doDelete, doPatch, doPost, doGet } from "../../utils/fetch-utils";
import { PLACEHOLDER_IMAGE } from "../../images/Images";
import { useEffect } from "react";


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

export const AccommodationCard = ({ accommodationData, canModify, selected, votes, onSuccess, canOpenTransport }) => {

    const { groupId } = useParams();
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [numOfVotes, setNumOfVotes] = useState(accommodationData.givenVotes);
    //dodanie tego czy zagłosował dany użytkownik, bo teraz jest zawsze false
    const [userVote, setUserVote] = useState(votes.some(vote => vote['userId'] === parseInt(localStorage.getItem('userId'))));
    const [expanded, setExpanded] = useState(false);
    const [selectDialogOpen, setSelectDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [transportDialogOpen, setTransportDialogOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [noDatesSelectedDialogOpen, setNoDatesSelectedDialogOpen] = useState(false);
    const [selectedSharedAvailability, setSelectedSharedAvailability] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        getCurrency();
        getSelectedSharedAvailability();
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenTransportDialog = () => {
        selectedSharedAvailability ?
            setTransportDialogOpen(true)
            :
            setNoDatesSelectedDialogOpen(true);
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

    const voteAction = () => {
        setUserVote(!userVote)
        if (userVote) {
            handleDeleteVoteAccommodation(() => setNumOfVotes(numOfVotes - 1));
        }
        else {
            handleVoteAccommodation(() => setNumOfVotes(numOfVotes + 1));
        }
    };

    const getSelectedSharedAvailability = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var selectedSharedAvailability = response.selectedSharedAvailability;
                setSelectedSharedAvailability(selectedSharedAvailability);
            }
            )
            .catch(err => console.log('Request Failed', err));
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

    const handleVoteAccommodation = async (success) => {
        await doPost('/api/v1/accommodation/vote', accommodationData)
            .then(response => {
                if (response.ok) {
                    success();
                }
            })
            .catch(err => {
                // setErrorToastOpen(true); 
                // setEditionError(err.message)
            });
    };

    const handleDeleteVoteAccommodation = async (success) => {
        await doPatch('/api/v1/accommodation/vote', { "userId": parseInt(localStorage.getItem("userId")), "accommodationId": accommodationData.accommodationId })
            .then(response => {
                if (response.ok) {
                    success();
                }
            })
            .catch(err => {
                // setErrorToastOpen(true); 
                // setEditionError(err.message)
            });
    };

    return (
        <>
            <NoDatesSelectedDialog
                open={noDatesSelectedDialogOpen}
                onClose={() => setNoDatesSelectedDialogOpen(false)}
            />
            <SelectAccommodationDialog
                open={selectDialogOpen}
                onClose={() => { setSelectDialogOpen(false) }}
            />
            <EditAccommodationDialog
                open={editDialogOpen}
                onClose={() => { setEditDialogOpen(false) }}
                accommodationData={accommodationData}
            />
            <DeleteAccommodationDialog
                open={deleteDialogOpen}
                onClose={() => { setDeleteDialogOpen(false) }}
                accommodationId={accommodationData.accommodationId}
                onSuccess={() => onSuccess()}
            />
            <TransportDialog
                open={transportDialogOpen}
                onClose={() => { setTransportDialogOpen(false) }}
                accommodationId={accommodationData.accommodationId}
            />
            <Card
                sx={{ height: "100%", borderRadius: "10px", width: "100%" }}
                elevation={10}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "80px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: selected ? "secondary.main" : "primary.main",
                        color: "#000000",
                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                        "& .MuiCardHeader-content": {
                            overflow: "hidden"
                        }
                    }}
                >
                    <Box sx={{
                        width: "80%", display: "flex", flexDirection: "column", minHeight: "30px", maxHeight: "60px", ml: 2, overflow: "hidden"
                    }}>
                        <Typography sx={{
                            color: selected ? "#000000" : "#FFFFFF",
                            fontSize: "20px",
                            display: "-webkit-box",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical"
                        }}
                        >
                            {accommodationData.name}
                        </Typography>
                    </Box>
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
                                    <DeleteIcon sx={{ mr: "20px", color: "error.main" }} />
                                    <Typography sx={{ color: "error.main" }}>
                                        Delete
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>}
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    image={accommodationData.imageLink !== null ? accommodationData.imageLink : PLACEHOLDER_IMAGE}
                    alt="Paella dish"
                    sx={{
                        height: "250px",
                    }}
                />
                <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "flex-start" }}>
                        <Typography variant="h5">
                            Address:
                        </Typography>
                        <Box sx={{
                            display: "flex", flexDirection: "row", height: "40px", overflow: "hidden"
                        }}>
                            <Typography variant="body2" color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical"
                                }}
                            >
                                {accommodationData.streetAddress}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minWidth: "100px", ml: 5 }}>
                        <Typography variant="h5">
                            Price:
                        </Typography>
                        <Typography sx={{ fontSize: "20px" }} color="primary.main">
                            {currencyLoading ? <CircularProgress size="24px" sx={{ ml: 2, mt: 1 }} /> : `${accommodationData.price} ${currency}`}
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
                        <Button variant="outlined" target="_blank"
                            rel="noreferrer"
                            href={accommodationData.sourceLink}
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
                        <Button variant="outlined"
                            sx={{
                                borderRadius: "20px",
                                '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main" }
                            }}
                        >
                            <EmojiTransportationIcon />
                            <Typography
                                mx={"5px"}
                                onClick={handleOpenTransportDialog}
                            >
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
                            {accommodationData.description ? accommodationData.description : "No description provided."}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card >
            {/* </Grid> */}
        </>
    );
};