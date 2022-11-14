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


import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';


const navbarButtonsData = futureTripButtonsData

export const URL = '/accommodations/myAccommodationVotes';
export const NAME = "MyAccommodationsVotes";

const myAccommodationVotes = [
    {
        id: 1,
        name: "The Corner Hotel",
        address: "Mallorca 178, Eixample, 08036 Barcelona, Hiszpania",
        imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/100258929.jpg?k=67f71d6edcf48a30e9c9749397ef84e194a6d147e5badcbcd6676c2f5633d6d9&o=&hp=1",
        sourceLink: "https://www.booking.com/hotel/es/the-corner.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067414%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=175506201_0_2_0_0&checkin=2022-11-04&checkout=2022-11-06&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=12&highlighted_blocks=175506201_0_2_0_0&hpos=12&matching_block_id=175506201_0_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=bayesian_review_score&sr_pri_blocks=175506201_0_2_0_0__35822&srepoch=1667391860&srpvid=38ad57118bf102c7&type=total&ucfs=1&activeTab=main",
        description: "Obiekt The Corner Hotel położony jest w Barcelonie, 1, 1 km od budynku Casa Batlló.Oferuje on odkryty basen, prywatny parking, bar oraz taras. Udogodnienia obejmują całodobową recepcję i obsługę pokoju, a także bezpłatne WiFi we wszystkich pomieszczeniach.Doskonałym miejscem na relaks przy drinku jest bar przekąskowy. Wszystkie opcje zakwaterowania wyposażone są w klimatyzację oraz telewizor z płaskim ekranem i dostępem do kanałów satelitarnych.Do dyspozycji Gości jest też łazienka z wanną lub prysznicem, szlafrokami i kapciami.W każdym pokoju w hotelu The Corner przygotowano dla Gości pościel i ręczniki.Codziennie rano serwowane jest śniadanie w formie bufetu.",
        givenVotes: 2,
        price: 3890,
        longitude: 2.156496558180025,
        latitude: 41.38929134020421
    },
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
        id: 6,
        name: "Hotel Continental Palacete",
        address: "Rambla de Catalunya, 30, Eixample, 08007 Barcelona, Hiszpania",
        imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/256880053.jpg?k=4120b3ab9786602ba06cebec9a1ac0c214ed21987306a657c53d09018ad996cb&o=&hp=1",
        sourceLink: "https://www.booking.com/hotel/es/continental-palacete.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=0_0_2_1_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=0_0_2_1_0&hpos=1&matching_block_id=0_0_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=0_0_2_1_0__75738&srepoch=1667806820&srpvid=0c2035f17afc0040&type=total&ucfs=1&activeTab=main",
        description: "Elegancki Hotel Continental Palacete mieści się w odrestaurowanym XIX-wiecznym pałacu w samym sercu Barcelony, w odległości zaledwie 350 metrów od placu Plaça Catalunya. Goście mają dostęp do bezpłatnego, całodobowego bufetu kontynentalnego z różnorodnymi potrawami i napojami. Obiekt Continental Palacete zapewnia luksusowy, barokowy wystrój wnętrz, w których podziwiać można bezcenne żyrandole i wyszukane freski. W nowoczesnych, klimatyzowanych pokojach zapewniono bezpłatne WiFi, telewizor z dostępem do kanałów satelitarnych, lodówkę i kuchenkę mikrofalową.W łazienkach znajduje się suszarka do włosów. Hotel położony jest przy eleganckiej ulicy Rambla de Catalunya, zaledwie 5 minut spacerem od głównego placu miasta, Plaça Catalunya.Okoliczne ulice pełne są przykładów charakterystycznej barcelońskiej architektury, eleganckich restauracji i ekskluzywnych butików.",
        givenVotes: 1,
        price: 3500,
        longitude: 2.165778569628897,
        latitude: 41.38991540807618
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


export const MyAccommodationVotesPage = () => {

    // const [numOfVotes, setNumOfVotes] = useState(accommodationsData.givenVotes)
    // const [userVote, setUserVote] = useState(true);
    const [expanded, setExpanded] = useState(false);

    // const voteAction = () => {
    //     setUserVote(!userVote)
    //     if (userVote) {
    //         setNumOfVotes(numOfVotes - 1);
    //     }
    //     else {
    //         setNumOfVotes(numOfVotes + 1);
    //     }
    // }

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const myVotes = myAccommodationVotes.map((accommodation) => (
        <Grid container item xs={12} spacing={10} key={accommodation.id}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'flex-start',
                mb: 8
            }}
        >
            <Grid item xs={12} md={5}>
                <AccommodationCard accommodationData={accommodation} canModify={false} selected={false} />
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
    ))

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%'
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
                                My accommodation votes
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {myVotes}
            </Box >
        </Box >
    );
};
