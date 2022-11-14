import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { DashboardFlipCard } from '../../dashboardFlipCard/DashboardFlipCard';
import { DashboardOptionCard } from '../../dashboardOptionCard/DashboardOptionCard';
import { ROMEURL } from '../../../images/Images';

import { trips } from '../../../../pages/dashboard-page/DashboardPage';


export const PastTrips = () => {
    const completedTrips = trips.filter(trip => trip.groupStage.includes('completed')).map(({ id, name }) => (
        <Grid container item spacing={3} sx={{ mx: "auto", mb: "50px" }} key={id}>
            <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                <DashboardFlipCard
                    frontBg={ROMEURL}
                    title={name}
                    description=""
                    action={{
                        route: "/tripSummary",
                        label: "Trip summary",
                        description: "Let's meet in Rome."
                    }} />
            </Grid>
            <Grid item xs={12} lg={8} sx={{ ml: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="currency_exchange"
                            title="Expenses"
                            description="Manage unregulated transactions."
                            route="/expenses"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon="photo_album"
                            title="Media"
                            description="Share and download memories from past trip."
                            route="/media"
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
                    <Typography variant="h3" sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "30px" }}>Completed trips</Typography>
                    {completedTrips.length === 0 ?
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <Typography variant="h5" sx={{ margin: "50px" }}>No completed trips yet</Typography>
                        </Box>
                        :
                        completedTrips}
                </Grid>
            </Container>
        </Box>
    )
}