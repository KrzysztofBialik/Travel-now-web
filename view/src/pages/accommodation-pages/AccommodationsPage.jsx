import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useParams } from "react-router-dom";
import { doGet } from "../../components/utils/fetch-utils";
import { useEffect } from "react";
import { AccommodationCard } from "../../components/accommodations/accommodationCard/AccommodationCard";
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { futureTripButtonsData, futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";


export const URL = '/accommodations/:groupId';
export const NAME = "Accommodations";

export const AccommodationsPage = () => {

    const { groupId } = useParams();
    const [numOfVotes, setNumOfVotes] = useState(0)
    const [userVote, setUserVote] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [allAccommodations, setAllAccommodations] = useState([]);
    const [accommodationsRaw, setAccommodationsRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [tripGroup, setTripGroup] = useState([]);


    var isCordinator = false;
    var tripData = false;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        isCorinator();
        getTripData();
        getChosenAccommodation();
    }, []);


    const updateData = () => {
        isCorinator();
        getTripData();
        getChosenAccommodation();
    };

    const isCorinator = async () => {
        var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
            .catch(err => console.log(err.message));
        var body = await resp.json();
        isCordinator = body;
    };

    const getTripData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setTripGroup(response);
                getData(response);
                return response;
            })
            .catch(err => console.log('Request Failed', err));
    };

    const getChosenAccommodation = async () => {
        setLoadingSelected(true)
        doGet('/api/v1/trip-group/accommodation-dto?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(accommodation => {
                if (accommodation.groupId === null) {
                    setSelectedAccommodation(null)
                } else {
                    setSelectedAccommodation(
                        <Grid item xs={12} key={accommodation.accommodationId}>
                            <AccommodationCard
                                accommodationData={accommodation}
                                canModify={(accommodation.creator_id === parseInt(sessionStorage.getItem("userId"))) || isCordinator}
                                selected={true}
                                isCoordinator={isCordinator}
                                votes={[]}
                                onSuccess={() => updateData()}
                            />
                        </Grid>)
                    setCenter({ lat: accommodation.latitude, lng: accommodation.longitude })
                }
            })
            .then(next => setLoadingSelected(false))
            .catch(err => console.log('Request Failed', err));
    };

    const getData = async (res) => {
        setLoading(true);
        doGet('/api/v1/accommodation/votes?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(json => { setAccommodationsRaw(json); return json })
            .then(accommodations => {
                setAllAccommodations(accommodations.map((accommodation) =>
                (
                    res.selectedAccommodationId !== accommodation.accommodation.accommodationId ?
                        <Grid item xs={12} md={4} key={accommodation.accommodation.accommodationId}>
                            <AccommodationCard
                                accommodationData={accommodation.accommodation}
                                canModify={(accommodation.accommodation.creator_id === parseInt(sessionStorage.getItem("userId"))) || isCordinator}
                                selected={false}
                                isCoordinator={isCordinator}
                                votes={accommodation.userVoted}
                                onSuccess={() => updateData()}
                            />
                        </Grid>
                        :
                        <Box />
                )));
            })
            .catch(err => console.log('Request Failed', err));
        setLoading(false);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%'
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
            >
                {selectedAccommodation !== null ?
                    <>
                        <Box
                            sx={{
                                p: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                maxWidth: "1200px",
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
                                            mb: "80px"
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
                                    <Grid item xs={12} md={6}>
                                        {selectedAccommodation}
                                    </Grid>
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
                            minWidth: "700px",
                            width: "100%"
                        }}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    mb: "80px"
                                }}
                            >
                                Possible accommodations
                            </Typography>
                        </Grid>
                        {
                            loading ?
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "400px",
                                        minWidth: "400px"
                                    }}
                                >
                                    <CircularProgress fontSize="48px" sx={{ color: "primary.main" }} />
                                </Box>
                                :
                                <Grid container item xs={12}
                                    spacing={5}
                                    sx={{
                                        display: "flex",
                                        // justifyContent: "center",
                                        alignItems: "flex-start",
                                        minWidth: "700px",
                                        minHeight: "400px",
                                        width: "100%",
                                        gridAutoRows: "1fr"
                                        // gap: "50px"
                                        // rowGap: "50px",
                                        // columnGap: "50px"
                                    }}
                                >
                                    {
                                        allAccommodations.length !== 0 ?
                                            allAccommodations
                                            :
                                            <Box
                                                sx={{
                                                    color: "primary.main",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    minHeight: "400px",
                                                }}
                                            >
                                                <Typography sx={{ fontSize: "32px" }}>
                                                    No accommodation suggestions provided yet
                                                </Typography>
                                            </Box>
                                    }
                                </Grid>
                        }
                    </Grid>
                </Box>

            </Box >
        </Box >
    );
};
