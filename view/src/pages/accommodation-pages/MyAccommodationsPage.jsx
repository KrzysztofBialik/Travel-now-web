import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { AccommodationsButtonGroup } from "../../components/accommodations/AccommodationsButtonGroup";
import { AccommodationCard } from "../../components/accommodations/accommodationCard/AccommodationCard";
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { AddAccommodationDialog } from "../../components/accommodations/AddAccommodationDialog";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { doGet } from "../../components/utils/fetch-utils";


export const URL = '/accommodations/myAccommodations/:groupId';
export const NAME = "MyAccommodations";

export const MyAccommodationsPage = () => {

    const { groupId } = useParams();
    const [addAccommodationDialogOpen, setAddAccommodationDialogOpen] = useState(false);
    const [myAccommodations, setMyAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accommodationsRaw, setAccommodationsRaw] = useState([]);
    const [currency, setCurrency] = useState("");
    var isCoordinator = false;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        console.log(groupId)
        getIsCoordinator()
            .then(() => getCurrency())
            .then(() => getData());
    }, []);


    const getIsCoordinator = async () => {
        var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
            .catch(err => console.log(err.message));
        var body = await resp.json();
        isCoordinator = body;
    };

    const getCurrency = async () => {
        var resp = await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var currency = response.currency;
                setCurrency(currency);
            })
            .catch(err => console.log('Request Failed', err));
    };

    const getData = async () => {
        setLoading(true);
        doGet('/api/v1/accommodation/votes?' + new URLSearchParams({ groupId: groupId, userId: parseInt(sessionStorage.getItem('userId')) }).toString())
            .then(response => response.json())
            .then(json => { setAccommodationsRaw(json); return json })
            .then(accommodations => setMyAccommodations(accommodations.sort((a, b) =>
                (a.accommodation.accommodationId < b.accommodation.accommodationId) ? 1
                    : (a.accommodation.accommodationId > b.accommodation.accommodationId) ? -1 : 0).map((accommodation) => (
                        accommodation.accommodation.creator_id === parseInt(sessionStorage.getItem("userId")) ?
                            <Grid container item xs={12} spacing={10} key={accommodation.accommodation.accommodationId}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'flex-start',
                                    mb: 8,
                                }}
                            >
                                <Grid item xs={12} md={5}>
                                    <AccommodationCard
                                        accommodationData={accommodation.accommodation}
                                        canModify={accommodation.accommodation.creator_id === parseInt(sessionStorage.getItem("userId"))}
                                        isCoordinator={isCoordinator}
                                        selected={false}
                                        votes={accommodation.userVoted}
                                        onSuccess={() => getData()}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5} >
                                    {true ?
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
                                            }}
                                        >
                                            <CircularProgress />
                                        </Box>}
                                </Grid>
                            </Grid>
                            :
                            <Box></Box>
                    ))))
            .catch(err => console.log('Request Failed', err));
        setLoading(false);
    };

    return (
        <>
            <AddAccommodationDialog
                open={addAccommodationDialogOpen}
                onClose={() => setAddAccommodationDialogOpen(false)}
                groupId={groupId}
                onSuccess={() => getData()}
                currency={currency}
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
                    // p: 10,
                    // pt: 5,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    minWidth: "1200px",
                    minHeight: '400px'
                }}
                >
                    <AccommodationsButtonGroup
                        clickedButton={"myAcc"}
                        groupId={groupId}
                    />
                    <Divider sx={{ width: "100%" }} />
                    <Box
                        sx={{
                            p: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "1200px",
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
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", px: 2, py: 1, fontSize: "20px" }}
                                    onClick={() => setAddAccommodationDialogOpen(true)}
                                >
                                    Add accommodation
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {loading ?
                        <Box sx={{ width: "400px", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircularProgress size="60px" sx={{ color: "primary.main" }} />
                        </Box>
                        :
                        myAccommodations.length === 0 ?
                            <Box sx={{
                                minHeight: "400px",
                                minWidth: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Typography sx={{ fontSize: "32px", color: "primary.main" }}>
                                    No accommodations added yet
                                </Typography>
                            </Box>
                            :
                            myAccommodations
                    }
                </Box >
            </Box >
        </>
    );
};
