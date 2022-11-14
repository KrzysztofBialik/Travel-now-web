import { useState } from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';

import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar.jsx';
import { SimpleNavbar } from '../../components/navbars/SimpleNavbar.jsx';
import { CreateTripDialog } from '../../components/dashboard/CreateTripDialog.jsx';
import { FutureTrips } from '../../components/dashboard/tripsList/futureTrips/FutureTrips.jsx';
import { CurrentTrips } from '../../components/dashboard/tripsList/currentTrips/CurrentTrips.jsx';
import { PastTrips } from '../../components/dashboard/tripsList/pastTrips/PastTrips.jsx';
import { BACKGROUND_DASHBOARD } from '../../components/images/Images.jsx';


export const trips = [
    {
        id: 1,
        name: "Barcelona",
        groupStage: "current"
    },
    {
        id: 2,
        name: "London",
        groupStage: "future"
    },
    {
        id: 3,
        name: "Rome",
        groupStage: "completed"
    },
]

export const URL = '/dashboard';
export const NAME = "Dashboard";

export const DashboardPage = () => {

    const [createTripDialogOpen, setCreateTripDialogOpen] = useState(false);
    const [tripsList, setTripsList] = useState(trips);

    //utworzenie nowej wycieczki
    const createTrip = (tripName, startingLocation, currency, minDays, minParticipants, description) => {
        console.log("create Trip");
        console.log(tripName);
        console.log(startingLocation);
        console.log(currency);
        console.log(minDays);
        console.log(minParticipants);
        console.log(description);
        // // trips.push(trip10, data.tripName, "future");
        // setTripsList(tripsList => [...tripsList, { id: 10, name: tripName, groupStage: "future" }])
        // console.log(tripsList)
    };

    return (
        // <div style={{ backgroundColor: 'black' }}>
        //     <h1>Welcome to dashboard</h1>
        //     <ParticlesComponent />
        // </div>
        // <ParticlesComponent />
        <>
            <CreateTripDialog
                open={createTripDialogOpen}
                onClose={() => setCreateTripDialogOpen(false)}
                createTrip={createTrip}
            />
            {/* <SimpleNavbar /> */}
            <NavigationNavbar buttonsData={[]} />
            <Box
                sx={{
                    backgroundImage: `url(${BACKGROUND_DASHBOARD})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    placeItems: "center",
                    minHeight: "75vh",
                    width: "100%"
                }}
            >
                <Grid container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <Grid item xs={12} justifyContent="center" mx="auto">
                        <Typography
                            variant="h1"
                            mt={-6}
                            mb={1}
                            textAlign="center"
                            color="common.white"
                            sx={{
                                fontSize: "40px",
                            }}
                        >
                            Explore the world with us
                        </Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent="center" mx="auto">
                        <Typography
                            variant="body1"
                            color="white"
                            textAlign="center"
                            px={{ xs: 6, lg: 12 }}
                            mt={1}
                        >
                            <Button
                                variant="contained"
                                onClick={() => setCreateTripDialogOpen(true)}
                            >
                                Start planning
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Card sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: -8,
                mb: 4,
                backgroundColor: "#BDD7EB",
                backdropFilter: "saturate(200%) blur(30px)",
            }}
            >
                <CurrentTrips />

                <Divider variant="middle" />
                <FutureTrips />

                <Divider variant="middle" />
                <PastTrips />
            </Card>
        </>
    );
};