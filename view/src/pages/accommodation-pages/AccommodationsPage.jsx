import { Box, Divider } from "@mui/material";
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
import { useParams } from "react-router-dom";
import { doGet, doGetAwait } from "../../components/utils/fetch-utils";
import { useEffect } from "react";

export const URL = '/accommodations/:groupId';
export const NAME = "Accommodations";

const navbarButtonsData = futureTripButtonsData

export const accommodationsData =
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
}

export const accommodationsDataFull = [
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
    },
    {
        id: 5,
        name: "Ikonik Anglí",
        address: "Angli, 60, Sarrià-St. Gervasi, 08017 Barcelona, Hiszpania",
        imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/144092931.jpg?k=6af42775783743d628ebb49673cfaab2ef2e1eac0e18b2090840ae60bb6606a2&o=&hp=1",
        sourceLink: "https://www.booking.com/hotel/es/eurostars-angli.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=9237514_0_2_0_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=9237514_0_2_0_0&hpos=1&matching_block_id=9237514_0_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=9237514_0_2_0_0__61046&srepoch=1667806811&srpvid=cab535ece6b4001e&type=total&ucfs=1&activeTab=main",
        description: "Obiekt Ikonik Anglí jest usytuowany w urokliwej dzielnicy mieszkalnej Sarrià. Ten elegancki hotel designerski oferuje odkryty basen i ogród z widokiem na górę Tibidabo. Na miejscu można korzystać z bezpłatnego WiFi. Wszystkie pokoje w obiekcie Ikonik Anglí są przestronne i charakteryzują się minimalistycznym wystrojem wnętrz, do którego przez duże okna wpada mnóstwo naturalnego światła.Pokoje wyposażone są w klimatyzację i telewizor z płaskim ekranem.Każdy z nich dysponuje nowocześnie urządzoną łazienką z zestawem kosmetyków. Codziennie rano w stylowej sali śniadaniowej serwowane jest śniadanie.Dzielnica Sarrià znana jest ze wspaniałych cukierni.W 5 minut można dojść z obiektu do wielu popularnych barów.W hotelu do dyspozycji Gości są sale konferencyjne. Zaledwie 600 metrów dzieli obiekt Ikonik Anglí od stacji kolei FGC Sarrià, z której można bezpośrednio dojechać do centrum Barcelony.Dojazd pociągiem na Plac Kataloński zajmuje zaledwie 10 minut.Najbliższe lotnisko – port lotniczy Barcelona – jest oddalone o 15 minut jazdy samochodem.",
        givenVotes: 7,
        price: 6400,
        longitude: 2.123170748592988,
        latitude: 41.40321484220564
    },
    {
        id: 6,
        name: "Hotel Continental Palacete",
        address: "Rambla de Catalunya, 30, Eixample, 08007 Barcelona, Hiszpania",
        imageLink: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/256880053.jpg?k=4120b3ab9786602ba06cebec9a1ac0c214ed21987306a657c53d09018ad996cb&o=&hp=1",
        sourceLink: "https://www.booking.com/hotel/es/continental-palacete.pl.html?aid=376384&label=Booking-PL-GokG1qZQBGAqiSCE_k2kpgS411092421248%3Apl%3Ata%3Ap1%3Ap22.563.000%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9067385%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Yf5EcukO1MOGv2VrE6ywbUM&sid=3096ed18f64c55b3dd4427b0b7bccce8&all_sr_blocks=0_0_2_1_0&checkin=2023-02-13&checkout=2023-02-20&dest_id=-372490&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=0_0_2_1_0&hpos=1&matching_block_id=0_0_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=0_0_2_1_0__75738&srepoch=1667806820&srpvid=0c2035f17afc0040&type=total&ucfs=1&activeTab=main",
        description: "Elegancki Hotel Continental Palacete mieści się w odrestaurowanym XIX-wiecznym pałacu w samym sercu Barcelony, w odległości zaledwie 350 metrów od placu Plaça Catalunya. Goście mają dostęp do bezpłatnego, całodobowego bufetu kontynentalnego z różnorodnymi potrawami i napojami. Obiekt Continental Palacete zapewnia luksusowy, barokowy wystrój wnętrz, w których podziwiać można bezcenne żyrandole i wyszukane freski. W nowoczesnych, klimatyzowanych pokojach zapewniono bezpłatne WiFi, telewizor z dostępem do kanałów satelitarnych, lodówkę i kuchenkę mikrofalową.W łazienkach znajduje się suszarka do włosów. Hotel położony jest przy eleganckiej ulicy Rambla de Catalunya, zaledwie 5 minut spacerem od głównego placu miasta, Plaça Catalunya.Okoliczne ulice pełne są przykładów charakterystycznej barcelońskiej architektury, eleganckich restauracji i ekskluzywnych butików.",
        givenVotes: 1,
        price: 4210,
        longitude: 2.165778569628897,
        latitude: 41.38991540807618
    }
]

const center = { lat: accommodationsData.latitude, lng: accommodationsData.longitude }

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

    const [numOfVotes, setNumOfVotes] = useState(accommodationsData.givenVotes)
    const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [allAccommodations, setAllAccommodations] = useState([]);
    const [accommodationsRaw, setAccommodationsRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [seletcedAccommodation, setSeletcedAccommodation] = useState();

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
        lsetLoading(true);
        doGet('/api/v1/accommodation/list?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(json => {setAccommodationsRaw(json); return json})
        .then(accommodations => {setAllAccommodations(accommodations.map((accommodation) => (
                <Grid item xs={12} md={4} key={accommodation.accommodationId}>
                    <AccommodationCard accommodationData={accommodation} canModify={(accommodation.creator_id === parseInt(localStorage.getItem("userId"))) || isCordinator} selected={false} />
                </Grid>)));
                setLoading(false);
            })
        .catch(err => console.log('Request Failed', err));
    };

    const getChosenAccommodation = async () => {
        setLoadingSelected(true)
        doGet('/api/v1/trip-group/accommodation?' + new URLSearchParams({ groupId: groupId }).toString())
        .then(response => response.json())
        .then(accommodation => accommodation.groupId === null ? setSeletcedAccommodation(null) : setSeletcedAccommodation(
                <Grid item xs={12} md={4} key={accommodation.accommodationId}>
                    <AccommodationCard accommodationData={accommodation} canModify={(accommodation.creator_id === parseInt(localStorage.getItem("userId"))) || isCordinator} selected={true} />
                </Grid>))
        .then(next => setLoadingSelected(false))
        .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        isCorinator();
        getData();
        getChosenAccommodation();
      }, [])

    // const allAccommodations = accommodationsDataFull.map((accommodation) => (
    //     <Grid item xs={12} md={4} key={accommodation.id}>
    //         <AccommodationCard accommodationData={accommodation} canModify={false} selected={false} />
    //     </Grid>
    // ))

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
                {/*-------------------------------Wybrane zakwaterowanie------------------------------------*/}
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

                {/*-------------------------------Reszta zakwaterowań------------------------------------*/}
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

                        {/*-----------------------------------sekcja tabel-----------------------------------*/}
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
                            {/*------------------------------------Accomodations------------------------------------*/}
                            {/* <Grid item xs={12} md={4}>
                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={false} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={false} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={false} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={false} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={false} />
                            </Grid> */}
                            {allAccommodations}
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </Box >
    );
};
