import { Box, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";

import { AccommodationCard } from "../../components/accommodations/accommodationCard/AccommodationCard";
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { futureTripButtonsData, futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";

//------------------------importy do drugiej opcji---------------------------------
import { useState } from "react";
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LinkIcon from '@mui/icons-material/Link';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

import { AddAccommodationDialog } from "../../components/accommodations/AddAccommodationDialog";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { doGet } from "../../components/utils/fetch-utils";

export const URL = '/accommodations/myAccommodations/:groupId';
export const NAME = "MyAccommodations";

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


export const MyAccommodationsPage = () => {
    const {groupId} = useParams();
    // const [numOfVotes, setNumOfVotes] = useState(accommodationsData.givenVotes)
    // const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [addAccommodationDialogOpen, setAddAccommodationDialogOpen] = useState(false);
    const [myAccommodations, setMyAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accommodationsRaw, setAccommodationsRaw] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const getData = async () => {
        setLoading(true);
        doGet('/api/v1/accommodation/votes?' + new URLSearchParams({ groupId: groupId, userId: parseInt(localStorage.getItem('userId')) }).toString())
        .then(response => response.json())
        .then(json => {setAccommodationsRaw(json); return json})
        .then(accommodations => {setMyAccommodations(accommodations.map((accommodation) => (
            <Grid container item xs={12} spacing={10} key={accommodation.accommodation.accommodationId}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'flex-start',
                    mb: 8,
                }}
            >
                <Grid item xs={12} md={5}>
                    <AccommodationCard accommodationData={accommodation.accommodation} canModify={accommodation.accommodation.creator_id === parseInt(localStorage.getItem("userId"))} selected={false} votes={accommodation.userVoted} onSuccess={() => getData()} />
                </Grid>
                <Grid item xs={12} md={5} >
                    {isLoaded ?
                        <GoogleMap
                            zoom={14}
                            center={{ lat: accommodation.accommodation.latitude, lng: accommodation.accommodation.longitude }}
                            mapContainerClassName="map-container"
                        >
                            <MarkerF position={{ lat: accommodation.accommodation.latitude, lng: accommodation.accommodation.longitude }} />
                        </GoogleMap>
                        :
                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "400px"
                            // border: "2px solid black"
                        }}
                        >  
                        <CircularProgress />
                        </Box>}
                </Grid>
            </Grid>
        )));
                setLoading(false);
            })
        .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getData();
        
      }, [])

    return (
        <>
            <AddAccommodationDialog
                open={addAccommodationDialogOpen}
                onClose={() => setAddAccommodationDialogOpen(false)}
                groupId={groupId}
                onSuccess={() => getData()}
            />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%',
                }}>
                <NavigationNavbar 
                buttonsData={futureTripButtonsDataWithGroupId(groupId)} 
                groupId={groupId}
                />
                <Box sx={{
                    p: 10,
                    // margin: 10,
                    // mx: { xs: 2, lg: 3 },
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    minWidth: "1200px"
                }}
                // elevation={4}
                >
                    <Box
                        sx={{
                            p: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // minWidth: "1200px"
                            maxWidth: "1200px",
                            // width: "1200px"
                        }}
                    >
                        <Grid container
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        mb: "30px"
                                    }}
                                >
                                    My accommodation suggestions
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                                mb: "30px"
                            }}>
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF" }}
                                    onClick={() => setAddAccommodationDialogOpen(true)}
                                >
                                    Add accommodation
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {myAccommodations}
                </Box >
            </Box >
        </>
    );
};
