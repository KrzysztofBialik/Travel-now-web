import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { InputAdornment } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import format from 'date-fns/format';

import { AccommodationCard } from '../../components/accommodations/accommodationCard/AccommodationCard';
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { ParticipantsTable } from '../../components/tripSummary/ParticipantsTable';
import { futureTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { futureTripButtonsData2 } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { currentTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import { pastTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateRangePickerDialog } from '../../components/availability/DateRangePickerDialog';
import { accommodationsData } from '../accommodation-pages/AccommodationsPage';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';


import "./TripSummaryPage.css"
import { Link } from 'react-router-dom';
import { DeleteAccommodationDialog } from '../../components/tripSummary/DeleteAccommodationDialog';
import { DeleteDatesDialog } from '../../components/tripSummary/DeleteDatesDialog';

export const URL = '/tripSummary';
export const NAME = "TripSummary";

const center = { lat: accommodationsData.latitude, lng: accommodationsData.longitude }


export const TripSummaryPage = () => {

    const isPlanningStage = false;

    const [deleteDatesDialogOpen, setDeleteDatesDialogOpen] = useState(false);
    const [deleteAccommodationDialogOpen, setDeleteAccommodationDialogOpen] = useState(false);
    const [dateRangePickerDialogOpen, setDateRangePickerDialogOpen] = useState(false);
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

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100%'
        }}>
            <NavigationNavbar buttonsData={futureTripButtonsData} />
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
                                "Trip name" summary
                            </Typography>
                        </Grid>

                        {/*-----------------------------------sekcja tabel-----------------------------------*/}
                        <Grid container item xs={12} spacing={10}>
                            {/*------------------------------------trip dates------------------------------------*/}
                            <DeleteDatesDialog open={deleteDatesDialogOpen} onClose={() => setDeleteDatesDialogOpen(false)} deleteDates={deleteDates} />
                            <DateRangePickerDialog open={dateRangePickerDialogOpen}
                                onClose={() => setDateRangePickerDialogOpen(false)}
                                initialRange={range}
                                rangeChange={(ranges) => handleRangesChange(ranges)} />
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
                                        <IconButton sx={{ p: 0 }} onClick={deleteDatesAction}>
                                            <DeleteIcon
                                                sx={{ color: "error.main", fontSize: "32px" }}></DeleteIcon>
                                        </IconButton>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        <TextField
                                            sx={{ width: "50%", minWidth: "240px" }}
                                            disabled={!isPlanningStage}
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
                                            helperText="Add dates here or choose one of the ranges from the optimized section."
                                            onClick={() => setDateRangePickerDialogOpen(true)}
                                            value={(range[0].startDate !== null && range[0].endDate !== null) ?
                                                `${format(range[0].startDate, "dd.MM.yyyy")} - ${format(range[0].endDate, "dd.MM.yyyy")}`
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
                                            <Link to="/availability">
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
                                                justifyContent: "space-around",
                                                pl: 1,
                                                minHeight: "200px"
                                                // border: "2px solid black"
                                            }}
                                        // elevation={4}
                                        >
                                            <Typography variant="h4">
                                                Wrocław, centrum handlowe Borek
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>

                            {/*------------------------------------Accommodation------------------------------------*/}
                            <DeleteAccommodationDialog open={deleteAccommodationDialogOpen} onClose={() => setDeleteAccommodationDialogOpen(false)} />
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
                                        <IconButton sx={{ p: 0 }} onClick={deleteAccommodationAction}>
                                            <DeleteIcon sx={{ color: "error.main", fontSize: "32px" }}></DeleteIcon>
                                        </IconButton>
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
                                            <Grid item xs={5}>
                                                <AccommodationCard accommodationData={accommodationsData} canModify={false} selected={true} />
                                            </Grid>
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
                                                    <Typography variant="h1">Loading...</Typography>}
                                            </Grid>
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
                                            <Link to="/accommodations">
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
                                        <ParticipantsTable />
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
                                        <Link to="/participants">
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
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </Box >
    );
};