import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const [isLoading, setIsLoading] = useState(false);

    const getTrips = async () => {
        setIsLoading(true);
        await doGet('/api/v1/trip-group/groups/' + localStorage.getItem("userId"))
            .then(response => response.json())
            .then(response => setTripsList(response))
            .then(setIsLoading(false))
            .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {
        getTrips();
    }, [])

    return (
        <>
            <CreateTripDialog
                open={createTripDialogOpen}
                onClose={() => setCreateTripDialogOpen(false)}
                onSuccess={() => getTrips()}
            />
            {/* <SimpleNavbar /> */}
            <NavigationNavbar buttonsData={[]} />
            <Box
                sx={{
                    backgroundImage: `url(${BACKGROUND_DASHBOARD})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    mt: -5,
                    placeItems: "center",
                    minHeight: "75vh",
                    minWidth: "1200px",
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
                            mt={-8}
                            textAlign="center"
                            color="#FFFFFF"
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
                                sx={{ color: "#FFFFFF", borderRadius: "20px", mt: 2 }}
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
                backgroundColor: "#F0F2F5",
                backdropFilter: "saturate(200%) blur(30px)",
                minWidth: "950px",
                borderRadius: "20px"
            }}
            >
                <CurrentTrips trips={tripsList} />

                <Divider variant="middle" />
                <FutureTrips trips={tripsList} />

                <Divider variant="middle" />
                <PastTrips trips={tripsList} />
            </Card>
        </>
    );
};