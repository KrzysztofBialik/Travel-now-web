import { Box, CircularProgress, Divider } from "@mui/material";
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


import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useParams } from "react-router-dom";
import { doGet, doGetAwait } from "../../components/utils/fetch-utils";
import { useEffect } from "react";

export const URL = '/accommodations/:groupId';
export const NAME = "Accommodations";

const navbarButtonsData = futureTripButtonsData;


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

export const AccommodationsPage = () => {

    const {groupId} = useParams();

    const [numOfVotes, setNumOfVotes] = useState(0)
    const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [allAccommodations, setAllAccommodations] = useState([]);
    const [accommodationsRaw, setAccommodationsRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [seletcedAccommodation, setSeletcedAccommodation] = useState(null);
    const [center, setCenter] = useState({ lat: 0, lng: 0 }) 
    
    var isCordinator = false;

    const voteAction = () => {
        setUserVote(!userVote)
        if (userVote) {
            setNumOfVotes(numOfVotes - 1);
        }
        else {
            setNumOfVotes(numOfVotes + 1);
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const isCorinator = async () => {
        var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
            .catch(err => console.log(err.message));
        var body = await resp.json();
        isCordinator = body;
    };

    const getData = async () => {
        setLoading(true);
        doGet('/api/v1/accommodation/votes?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(json => {setAccommodationsRaw(json); return json})
        .then(accommodations => {setAllAccommodations(accommodations.map((accommodation) => (
                <Grid item xs={12} md={4} key={accommodation.accommodation.accommodationId}>
                    <AccommodationCard accommodationData={accommodation.accommodation} canModify={(accommodation.accommodation.creator_id === parseInt(localStorage.getItem("userId"))) || isCordinator} selected={false} votes={accommodation.userVoted}/>
                </Grid>)));
                setLoading(false);
            })
        .catch(err => console.log('Request Failed', err));
    };

    const getChosenAccommodation = async () => {
        setLoadingSelected(true)
        doGet('/api/v1/trip-group/accommodation-dto?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(accommodation => {
            if(accommodation.groupId === null) {
                setSeletcedAccommodation(null)
            } else {
                setSeletcedAccommodation(
                    <Grid item xs={12} md={4} key={accommodation.accommodationId}>
                        <AccommodationCard accommodationData={accommodation} canModify={(accommodation.creator_id === parseInt(localStorage.getItem("userId"))) || isCordinator} selected={true} votes={[]} onSuccess={() => getData()}/>
                    </Grid>)
                    setCenter({ lat: accommodation.latitude, lng : accommodation.longitude })
            }
        })
        .then(next => setLoadingSelected(false))
        .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        isCorinator();
        getData();
        getChosenAccommodation();
      }, [])

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%'
            }}>
            <NavigationNavbar buttonsData={futureTripButtonsDataWithGroupId(groupId)} />
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
               { seletcedAccommodation !== null ?
                <>
                    <Box
                        sx={{
                            p: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // minWidth: "1200px"
                            maxWidth: "1200px",
                            // width: "1200px"
                            mb: "20px"
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
                                    Currently chosen accommodation
                                </Typography>
                            </Grid>
                            <Grid container item xs={12} spacing={10}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: 'flex-start'
                                }}
                            >
                                {seletcedAccommodation}
                                <Grid item xs={12} md={6} >
                                    {isLoaded ?
                                        <GoogleMap
                                            zoom={14}
                                            center={center}
                                            mapContainerClassName="map-container"
                                        >
                                            <MarkerF position={center} />
                                        </GoogleMap>
                                        :
                                        <Typography variant="h1">Loading...</Typography>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                        <Divider variant="middle" sx={{ width: "100%" }} />
                    </>
                    
                    :
                    <></>
                } 
                <Box
                            sx={{
                                p: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                // minWidth: "1200px"
                                maxWidth: "1200px",
                                // width: "1200px"
                                my: "20px"
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
                                    Possible accommodations
                                </Typography>
                            </Grid>
                        

                    
                {
                    !loading ?
                            <Grid container item xs={12}
                                spacing={5}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: 'flex-start',
                                    // gridAutoRows: "1fr"
                                    // gap: "50px"
                                    // rowGap: "50px",
                                    // columnGap: "50px"
                                }}
                            >
                                {allAccommodations}
                            </Grid>
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
                    </Box>
                                            
                }
                     </Grid>
                    </Box>
                
            </Box >
        </Box >
    );
};
