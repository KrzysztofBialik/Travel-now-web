import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { InputAdornment } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import format from 'date-fns/format';

import { AccommodationCard } from '../../components/accommodations/accommodationCard/AccommodationCard';
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { ParticipantsTable } from '../../components/tripSummary/ParticipantsTable';
import { futureTripButtonsDataWithGroupId } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { pastTripButtonsDataWithGroupId } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { currentTripButtonsDataWithGroupId } from '../../components/navbars/navigationNavbar/NavbarNavigationData';

import { futureTripButtonsData2 } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { currentTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { pastTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateRangePickerDialog } from '../../components/availability/DateRangePickerDialog';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';


import "./TripSummaryPage.css"
import { Link, useParams } from 'react-router-dom';
import { DeleteAccommodationDialog } from '../../components/tripSummary/DeleteAccommodationDialog';
import { DeleteDatesDialog } from '../../components/tripSummary/DeleteDatesDialog';
import { doGet } from '../../components/utils/fetch-utils';
import { parseISO } from 'date-fns/esm';
import { formatISO, parse, parseJSON } from 'date-fns';

export const URL = '/tripSummary/:groupId';
export const NAME = "TripSummary";

const center = { lat: 0, lng: 0 }


export const TripSummaryPage = () => {

    const { groupId } = useParams();

    const [isCordinator, setIsCordinator] = useState(false);;
    const [isPlanningStage, setIsPlanningStage] = useState(false);

    const [usersData, setUsersData] = useState([]);
    const [groupCoordinators, setGroupCoordinators] = useState([]);

    const [deleteDatesDialogOpen, setDeleteDatesDialogOpen] = useState(false);
    const [deleteAccommodationDialogOpen, setDeleteAccommodationDialogOpen] = useState(false);
    const [dateRangePickerDialogOpen, setDateRangePickerDialogOpen] = useState(false);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [seletcedAccommodation, setSeletcedAccommodation] = useState(null);
    const [sharedAvailability, setSharedAvailability] = useState(null);
    const [center, setCenter] = useState({ lat: 0, lng: 0 })
    const [userFullData, setUserFullData] = useState([])
    const [tripGroup, setTripGroup] = useState([]);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const handleRangesChange = (ranges) => {
        setRange(ranges);
    };

    const deleteDatesAction = () => {
        setDeleteDatesDialogOpen(true);
    };

    const deleteDates = () => {
        setRange([{ startDate: null, endDate: null }])
    }

    const deleteAccommodationAction = () => {
        setDeleteAccommodationDialogOpen(true);
    };

    const selectNavbar = () => {
        if (tripGroup.groupStage === 'PLANNING_STAGE') {
            return futureTripButtonsDataWithGroupId(groupId);
        }
        else if (tripGroup.groupStage === 'TRIP_STAGE') {
            return currentTripButtonsDataWithGroupId(groupId);
        }
        else {
            return pastTripButtonsDataWithGroupId(groupId)
        }
    }

    //na podstawie informacji o grupie będzie pobierany stan tego tripa i dzięki temu wyświetlane odpowiednie opcje na navbarze
    // let navigationButtonsData = [];
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    // if (tripStage === 1) {
    //     navigationButtonsData = futureTripButtonsData;
    // }
    // else if (tripStage === 2) {
    //     navigationButtonsData = currentTripButtonsData;
    // }
    // else {
    //     navigationButtonsData = pastTripButtonsData;
    // }

    const isCorinator = async () => {
        var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
            .catch(err => console.log(err.message));
        var body = await resp.json();
        setIsCordinator(body);
    };

    const getChosenAccommodation = async () => {
        setLoadingSelected(true)
        doGet('/api/v1/trip-group/accommodation-dto?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(accommodation => {
                if (accommodation.groupId === null) {
                    setSeletcedAccommodation(null)
                } else {
                    setSeletcedAccommodation(
                        <Grid item xs={12} md={4} key={accommodation.accommodationId}>
                            <AccommodationCard accommodationData={accommodation} canModify={(accommodation.creator_id === parseInt(localStorage.getItem("userId"))) || isCordinator} selected={true} votes={[]} onSuccess={() => console.log()} />
                        </Grid>)
                    setCenter({ lat: accommodation.latitude, lng: accommodation.longitude })
                }
            })
            .then(next => setLoadingSelected(false))
            .catch(err => console.log('Request Failed', err));
    };

    const getUsersData = async () => {
        await doGet('/api/v1/user-group/participants?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setUsersData(response))
            .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/user-group/coordinators?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setGroupCoordinators(response))
            .catch(err => console.log('Request Failed', err));
    }

    const getTripData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setTripGroup(response);
                setIsPlanningStage(response.groupStage === 'PLANNING_STAGE');
            })
            .catch(err => console.log('Request Failed', err));
    }

    const getSelectedAvailability = async () => {
        await doGet('/api/v1/shared-availability?' + new URLSearchParams({ sharedGroupAvailabilityId: tripGroup.selectedSharedAvailability }).toString())
            .then(response => response.json())
            .then(response => {
                setSharedAvailability(response);
                setIsPlanningStage(response.groupStage === 'PLANNING_STAGE');
            })
            .catch(err => console.log('Request Failed', err));
    }

    var tempData = [];
    const userWithRoles = () => {

        for (var i = 0; i < usersData.length; i++) {
            var user = {}
            let userId = usersData[i].userId;
            let firstName = usersData[i].firstName;
            let surname = usersData[i].surname;
            let phoneNumber = usersData[i].phoneNumber;
            let email = usersData[i].email;
            let role;

            if (groupCoordinators.some(coordinator => coordinator.userId === usersData[i].userId)) {
                role = "COORDINATOR"
            }
            else {
                role = "PARTICIPANT";
            }
            user['userId'] = userId;
            user['firstName'] = firstName;
            user['surname'] = surname;
            user['phoneNumber'] = phoneNumber;
            user['email'] = email;
            user['role'] = role;
            tempData.push(user);
        }
    }

    userWithRoles();

    useEffect(() => {
        isCorinator();
        getUsersData();
        getChosenAccommodation();
        getTripData();
    }, [])

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100%'
        }}>
            <NavigationNavbar

                buttonsData={selectNavbar()} />
            <Box sx={{
                p: 10,
                mx: { xs: 2, lg: 3 },
                margin: 4,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                minWidth: "1000px"
            }}
            // elevation={4}
            >
                <Box component="section"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "1000px"
                    }}
                >
                    <Grid container spacing={10}>
                        <Grid item xs={12} alignItems="center" sx={{ mx: "auto" }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    mb: "30px"
                                }}
                            >
                                <Typography variant="h3" sx={{ color: "primary.main", mr: 2 }}>
                                    {tripGroup.name}
                                </Typography>
                                summary
                            </Typography>
                        </Grid>

                        {/*-----------------------------------sekcja tabel-----------------------------------*/}
                        <Grid container item xs={12} spacing={10}>
                            {/*------------------------------------trip dates------------------------------------*/}
                            <DeleteDatesDialog open={deleteDatesDialogOpen} onClose={() => setDeleteDatesDialogOpen(false)} deleteDates={deleteDates} groupId={groupId} onSuccess={() => getTripData()} />
                            <DateRangePickerDialog open={dateRangePickerDialogOpen}
                                onClose={() => setDateRangePickerDialogOpen(false)}
                                initialRange={range}
                                rangeChange={(ranges) => handleRangesChange(ranges)}
                                onSuccess={() => getTripData()}
                                shared={true}
                                groupId={groupId}
                            />
                            <Grid item xs={6}>
                                <Card
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
                                        borderRadius: "10px",
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 3,
                                            px: 2,
                                            // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }} >
                                            Dates of the trip
                                        </Typography>
                                        {(isPlanningStage && isCordinator) ?
                                            <IconButton sx={{ p: 0 }} onClick={deleteDatesAction}>
                                                <DeleteIcon
                                                    sx={{ color: "error.main", fontSize: "32px" }}></DeleteIcon>
                                            </IconButton>
                                            :
                                            <></>
                                        }
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        {!isPlanningStage ?
                                            <Typography sx={{ color: "primary.main", fontSize: "32px" }}>
                                                Final dates of the trip
                                            </Typography>
                                            :
                                            <></>
                                        }
                                        <></>
                                        <TextField
                                            sx={{ width: "50%", minWidth: "330px" }}
                                            disabled={!isPlanningStage || !isCordinator}
                                            type='string'
                                            margin="normal"
                                            step='any'
                                            name='dates'
                                            label='Dates'
                                            variant="outlined"
                                            // defaultValue={tripDates}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonthOutlinedIcon sx={{ color: "primary.main" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            helperText={isPlanningStage ? "Only coordinator can change dates here or choose one of the ranges from the optimized section"
                                                : ""}
                                            onClick={(isPlanningStage && isCordinator) ? () => setDateRangePickerDialogOpen(true) : undefined}
                                            value={(tripGroup.selectedSharedAvailability !== null) ?
                                                `From: ${tripGroup.startDate} To: ${tripGroup.endDate}`
                                                : "No dates selected"
                                            }
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mx: 2,
                                                mt: 3,
                                                bottom: 0
                                            }}
                                        >
                                            {isPlanningStage ?
                                                <Link to={"/availability/" + groupId}>
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: "primary.main",
                                                            color: "#FFFFFF",
                                                            borderRadius: "20px",
                                                            '&:hover': { backgroundColor: "primary.light" }
                                                        }}
                                                    >
                                                        View more
                                                    </Button>
                                                </Link>
                                                :
                                                <></>
                                            }
                                        </Box>
                                    </Box>

                                </Card>
                            </Grid>

                            {/*------------------------------------Start location------------------------------------*/}
                            <Grid item xs={6}>
                                <Card
                                    sx={{
                                        minHeight: "300px",
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        borderRadius: "10px",
                                        boxShadow: "rgb(0 0 0 / 10 %) 0rem 0.25rem 0.375rem - 0.0625rem, rgb(0 0 0 / 6 %) 0rem 0.125rem 0.25rem -0.0625rem"
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 3,
                                            px: 2,
                                            // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                                            Starting location
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        justifyItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyItems: "center",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                pl: 1,
                                                minHeight: "200px"
                                            }}
                                        >
                                            <Typography variant="h4">
                                                {tripGroup.startLocation}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>

                            {/*------------------------------------Accommodation------------------------------------*/}
                            <DeleteAccommodationDialog open={deleteAccommodationDialogOpen} onClose={() => setDeleteAccommodationDialogOpen(false)} groupId={groupId} onSuccess={() => getChosenAccommodation()} />
                            <Grid item xs={12}>
                                <Card
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
                                        borderRadius: "10px"
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 3,
                                            px: 2,
                                            // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }} >
                                            Accommodation
                                        </Typography>
                                        {(isPlanningStage && isCordinator) ?
                                            <IconButton sx={{ p: 0 }} onClick={deleteAccommodationAction}>
                                                <DeleteIcon sx={{ color: "error.main", fontSize: "32px" }}></DeleteIcon>
                                            </IconButton>
                                            :
                                            <></>
                                        }
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        justifyItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        <Grid container spacing={10} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                                            {seletcedAccommodation !== null ?
                                                <>
                                                    {seletcedAccommodation}
                                                    <Grid item xs={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        {isLoaded ?
                                                            <GoogleMap
                                                                zoom={14}
                                                                center={center}
                                                                mapContainerClassName="map-container"
                                                            >
                                                                <MarkerF position={center} />
                                                            </GoogleMap>
                                                            :
                                                            <Box sx={{ width: "100%", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <CircularProgress />
                                                            </Box>
                                                        }
                                                    </Grid>
                                                </>
                                                :
                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            minWidth: "400px",
                                                            minHeight: "300px",
                                                            maxHeight: "300px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Typography sx={{ color: "primary.main", fontSize: "40px" }}>
                                                            No accommodation has been selected
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            }

                                        </Grid>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mx: 2,
                                                mt: 3,
                                                bottom: 0
                                            }}
                                        >
                                            {isPlanningStage ?
                                                <Link to={"/accommodations/" + groupId}>
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: "primary.main",
                                                            color: "#FFFFFF",
                                                            borderRadius: "20px",
                                                            '&:hover': { backgroundColor: "primary.light" }
                                                        }}>
                                                        View more
                                                    </Button>
                                                </Link>
                                                :
                                                <></>
                                            }
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>

                        {/*------------------------------------Participants------------------------------------*/}
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    minHeight: "300px",
                                    minWidth: "500px",
                                    overflow: "visible",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    overflowWrap: "break-word",
                                    backgroundClip: "border-box",
                                    borderRadius: "10px"
                                }}
                                elevation={16}
                            >
                                <Box
                                    sx={{
                                        mx: 2,
                                        mt: -3,
                                        py: 3,
                                        px: 2,
                                        // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                        backgroundColor: "primary.main",
                                        color: "#000000",
                                        borderRadius: "0.5rem",
                                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                                    }}
                                >
                                    <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                                        Participants
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "stretch",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    justifyItems: "center",
                                    margin: 2,
                                    minHeight: "200px"
                                }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyItems: "center",
                                            pl: 1,
                                            minHeight: "150px"
                                            // border: "2px solid black"
                                        }}
                                    // elevation={4}
                                    >
                                        <ParticipantsTable userData={tempData} />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: 2,
                                            mt: 3,
                                            bottom: 0
                                        }}
                                    >
                                        <Link to={"/participants/" + groupId}>
                                            <Button variant="contained"
                                                sx={{
                                                    backgroundColor: "primary.main",
                                                    color: "#FFFFFF",
                                                    borderRadius: "20px",
                                                    '&:hover': { backgroundColor: "primary.light" }
                                                }}>
                                                View more
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around"
                            }}>
                                {(isPlanningStage && isCordinator) ?
                                    <Button variant="contained"
                                        sx={{
                                            fontSize: "28px",
                                            color: "#FFFFFF",
                                            backgroundColor: "primary.main",
                                            borderRadius: "20px",
                                            '&:hover': { backgroundColor: "primary.light" }
                                        }}>
                                        Begin trip
                                    </Button>
                                    :
                                    <></>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </Box >
    );
};