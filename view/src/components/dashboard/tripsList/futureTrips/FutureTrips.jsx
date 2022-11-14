import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';

import { DashboardFlipCard } from '../../dashboardFlipCard/DashboardFlipCard';
import { DashboardOptionCard } from '../../dashboardOptionCard/DashboardOptionCard';
import { LONDONURL } from '../../../images/Images';

import { trips } from '../../../../pages/dashboard-page/DashboardPage';

export const FutureTrips = () => {

    const futureTrips = trips.filter(trip => trip.groupStage.includes('future')).map(({ id, name }) => (
        <Grid container item spacing={3} sx={{ mx: "auto", mb: "50px" }} key={id}>
            <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                <DashboardFlipCard
                    frontBg={LONDONURL}
                    title={name}
                    description=""
                    action={{
                        route: "/tripSummary",
                        label: "Trip summary",
                        description: "Possible description of the trip."
                    }} />
            </Grid>
            <Grid item xs={12} lg={8} sx={{ ml: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="calendar_month"
                            title="Availability"
                            description="Set your availability and check when other participants are available."
                            route="/availability"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="home"
                            title="Accommodations"
                            description="Check details of possible accomodations for this trip."
                            route="/accommodations"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="groups_2"
                            title="Participants"
                            description="See other participants of this trip."
                            route="/participants"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ));

    return (
        <Box component="section" py={6} my={6}>
            <Container>
                <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
                    <Typography variant="h3" sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "30px" }}>Upcoming trips</Typography>
                    {futureTrips.length === 0 ?
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <Typography variant="h5" sx={{ margin: "50px" }}>No upcoming trips</Typography>
                        </Box>
                        :
                        futureTrips}
                </Grid>
            </Container>
        </Box>
    );
};