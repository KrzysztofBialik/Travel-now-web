import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';

import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar.jsx';
import { CreateTripDialog } from '../../components/dashboard/CreateTripDialog.jsx';
import { FutureTrips } from '../../components/dashboard/tripsList/futureTrips/FutureTrips.jsx';
import { CurrentTrips } from '../../components/dashboard/tripsList/currentTrips/CurrentTrips.jsx';
import { PastTrips } from '../../components/dashboard/tripsList/pastTrips/PastTrips.jsx';
import { BACKGROUND_DASHBOARD } from '../../components/images/Images.jsx';
import { doGet } from "../../components/utils/fetch-utils";




export const URL = '/dashboard';
export const NAME = "Dashboard";

export const DashboardPage = () => {

    const [createTripDialogOpen, setCreateTripDialogOpen] = useState(false);
    const [tripsList, setTripsList] = useState([]);

    const getTrips = async () => {
        localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6IkRvcmlhbiJ9.spFruljGVOCA2_CVdl4nP36AcWeKy2YvEIQ5aYoqrxw")
        localStorage.setItem("userId", 31)
        await doGet('/api/v1/trip-group/groups/' + localStorage.getItem("userId"))
        .then(response => response.json())
        .then(response => setTripsList(response))
        .catch(err => console.log('Request Failed', err));
    }
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

    useEffect(() => {
        getTrips();
      }, [])

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
                                sx={{ color: "#FFFFFF", borderRadius: "20px" }}
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
                <CurrentTrips trips={tripsList}/>

                <Divider variant="middle" />
                <FutureTrips trips={tripsList}/>

                <Divider variant="middle" />
                <PastTrips trips={tripsList}/>
            </Card>
        </>
    );
};