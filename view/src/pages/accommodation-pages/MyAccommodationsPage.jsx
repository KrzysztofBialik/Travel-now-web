import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";

import { AccommodationCard } from "../../components/accommodations/accommodationCard/AccommodationCard";
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { futureTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";

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

export const URL = '/accommodations/myAccommodations';
export const NAME = "MyAccommodations";


const navbarButtonsData = futureTripButtonsData

export const myAccommodationsData =
    [
        {
            id: 2,
            name: "The Barcelona EDITION",
            address: "Avinguda Francesc Cambo 14, Ciutat Vella, 08003 Barcelona, Hiszpania",
            imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/221885222.jpg?k=001204687a5e33c25e1e000bcec19f8b0d2331df55487035e1b2918ccbf7222f&o=&hp=1",
            sourceLink: "https://www.booking.com/hotel/es/the-barcelona-edition.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=361366003_118726795_0_2_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=361366003_118726795_0_2_0&hpos=1&matching_block_id=361366003_118726795_0_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=361366003_118726795_0_2_0__255592&srepoch=1667806790&srpvid=dc4f35e2170804f8&type=total&ucfs=1&activeTab=photosGallery",
            description: "The Barcelona EDITION has a restaurant, outdoor swimming pool, a fitness centre and bar in Barcelona. Featuring a terrace, the 5-star hotel has air-conditioned rooms with free WiFi. The accommodation offers a 24-hour front desk, room service and currency exchange for guests.All guest rooms at the hotel come with a seating area. At The Barcelona EDITION all rooms are fitted with a desk, a flat- screen TV and a private bathroom. A la carte breakfast is available every morning at the accommodation. You can play billiards at The Barcelona EDITION.",
            givenVotes: 1,
            price: 5000,
            longitude: 2.1777244677802856,
            latitude: 41.38605667299379
        },
        {
            id: 3,
            name: "Gaudi Hotel",
            address: "Nou de la Rambla, 12, Ciutat Vella, 08001 Barcelona, Hiszpania",
            imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/15737107.jpg?k=dcdf56d97303cbca739444bea6208804411a8b7d36c61619503b552ecb649062&o=&hp=1",
            sourceLink: "https://www.booking.com/hotel/es/gaudi-barcelona.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=9269815_0_2_0_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=9269815_0_2_0_0&hpos=1&matching_block_id=9269815_0_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=9269815_0_2_0_0__91999&srepoch=1667806798&srpvid=7ed935e69d700045&type=total&ucfs=1&activeTab=main",
            description: "Hotel Gaudi położony jest zaledwie 50 metrów od słynnej alei Las Ramblas w Barcelonie. Oferuje on wspólny taras z widokiem na miasto i pałac Güell. Na miejscu zapewniono bezpłatne WiFi. Obiekt znajduje się 300 metrów od stacji metra Liceu.Do wielu atrakcji miasta można z niego z łatwością dotrzeć spacerem.Odległość od targu la Boqueria wynosi 450 metrów.Spacer do portu i centrum handlowego Maremagnum zajmuje 10 minut. Wszystkie pokoje w hotelu Gaudi są klimatyzowane i dysponują łazienką oraz telewizorem.Niektóre pokoje oferują prywatny balkon i sejf.Pokoje zostały nowocześnie urządzone i zapewniają drewniane podłogi.Z niektórych pokoi roztaczają się wspaniałe widoki na miasto i pałac Güell.",
            givenVotes: 5,
            price: 3500,
            longitude: 2.173949684970729,
            latitude: 41.3790964893114
        },
        {
            id: 4,
            name: "ME Barcelona",
            address: "Carrer de Casp 1-13, Eixample, 08010 Barcelona, Hiszpania",
            imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/334168794.jpg?k=f0acd8ca81d5041ad8d1ed609e4da118593821a42a991e885c28b34df0e13514&o=&hp=1",
            sourceLink: "https://www.booking.com/hotel/es/me-barcelona-barcelona.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=693981302_285547222_0_2_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=693981302_285547222_0_2_0&hpos=1&matching_block_id=693981302_285547222_0_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=693981302_285547222_0_2_0__278392&srepoch=1667806805&srpvid=7d1535e9e6f4022e&type=total&ucfs=1&activeTab=main",
            description: "Obiekt ME Barcelona znajduje się w miejscowości Barcelona w regionie Katalonia i oferuje bar. Odległość ważnych miejsc od obiektu: Plaża Platja del Somorrostro – 2,7 km, Sant Miquel Beach – 2,7 km. Do dyspozycji Gości przygotowano takie udogodnienia, jak restauracja, całodobowa recepcja, obsługa pokoju oraz bezpłatne WiFi we wszystkich pomieszczeniach. Na miejscu zapewniono wieczorną rozrywkę oraz usługę konsjerża. Każdego ranka na miejscu serwowane jest śniadanie kontynentalne, w formie bufetu lub à la carte. Obiekt dysponuje tarasem.",
            givenVotes: 4,
            price: 4500,
            longitude: 2.1700200643006458,
            latitude: 41.38909487080109
        }
    ]

// const center = { lat: accommodationsData.latitude, lng: accommodationsData.longitude }

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
    // const [numOfVotes, setNumOfVotes] = useState(accommodationsData.givenVotes)
    // const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [addAccommodationDialogOpen, setAddAccommodationDialogOpen] = useState(false);

    const addAccommodation = (link, price, description) => {
        console.log("Add Accommodation");
        console.log(link);
        console.log(price);
        console.log(description);
        // // trips.push(trip10, data.tripName, "future");
        // setTripsList(tripsList => [...tripsList, { id: 10, name: tripName, groupStage: "future" }])
        // console.log(tripsList)
    };

    // const voteAction = () => {
    //     setUserVote(!userVote)
    //     if (userVote) {
    //         setNumOfVotes(numOfVotes - 1);
    //     }
    //     else {
    //         setNumOfVotes(numOfVotes + 1);
    //     }
    // }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const myAccommodations = myAccommodationsData.map((accommodation) => (
        <Grid container item xs={12} spacing={10} key={accommodation.id}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'flex-start',
                mb: 8,
            }}
        >
            <Grid item xs={12} md={5}>
                <AccommodationCard accommodationData={accommodation} canModify={true} selected={false} />
            </Grid>
            <Grid item xs={12} md={5} >
                {isLoaded ?
                    <GoogleMap
                        zoom={14}
                        center={{ lat: accommodation.latitude, lng: accommodation.longitude }}
                        mapContainerClassName="map-container"
                    >
                        <MarkerF position={{ lat: accommodation.latitude, lng: accommodation.longitude }} />
                    </GoogleMap>
                    :
                    <Typography variant="h1">Loading...</Typography>}
            </Grid>
        </Grid>
    ));

    return (
        <>
            <AddAccommodationDialog
                open={addAccommodationDialogOpen}
                onClose={() => setAddAccommodationDialogOpen(false)}
                addAccommodation={addAccommodation}
            />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%',
                }}>
                <NavigationNavbar buttonsData={navbarButtonsData} />
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
