import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { DashboardFlipCard } from '../../dashboardFlipCard/DashboardFlipCard';
import { DashboardOptionCard } from '../../dashboardOptionCard/DashboardOptionCard';
import { BARCELONAURL } from '../../../images/Images';


export const CurrentTrips = ({trips}) => {
    const tripStageTrips = trips.filter(trip => trip.groupStage === 'TRIP_STAGE');
    const currentTrips = tripStageTrips.map(({ groupId, name, description }) => (
        <Grid container item spacing={3} sx={{ mx: "auto", mb: "50px" }} key={groupId}>
            <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                <DashboardFlipCard
                    frontBg={BARCELONAURL}
                    title={name}
                    description= {description}
                    action={{
                        route: "/tripSummary",
                        label: "Trip summary",
                        description: "check details of this trip",
                    }} />
            </Grid>
            <Grid item xs={12} lg={8} sx={{ ml: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="map"
                            title="Day plan"
                            description="Check what is the plan for a certain day of the trip."
                            route="/dayPlan"
                            
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="currency_exchange"
                            title="Finances"
                            description="Control finances during the trip."
                            route="/finances"
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
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="fact_checked"
                            title="Trip summary"
                            description="Check general info about the trip."
                            route="/tripSummary"
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
                    <Typography variant="h3" sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "30px" }}>Current trips</Typography>
                    {currentTrips.length === 0 ?
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <Typography variant="h5" sx={{ margin: "50px" }}>No current trips</Typography>
                        </Box>
                        :
                        currentTrips}
                </Grid>
            </Container>
        </Box>
    );
};