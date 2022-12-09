import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Groups2Icon from '@mui/icons-material/Groups2';
import { DashboardFlipCard } from '../../dashboardFlipCard/DashboardFlipCard';
import { DashboardOptionCard } from '../../dashboardOptionCard/DashboardOptionCard';
import { ROMEURL } from '../../../images/Images';

export const PastTrips = ({ trips }) => {
    const tripAfterTripStage = trips.filter(trip => trip.groupStage === 'AFTER_TRIP_STAGE')
    const completedTrips = tripAfterTripStage.map(({ groupId, name, description, groupStage }) => (
        <Grid container item spacing={3} sx={{ mx: "auto", mb: "50px" }} key={groupId}>
            <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                <DashboardFlipCard
                    frontBg={ROMEURL}
                    title={name}
                    description={description}
                    action={{
                        route: "/tripSummary/" + groupId,
                        label: "Trip summary",
                    }} />
            </Grid>
            <Grid item xs={12} lg={8} sx={{ ml: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon={<CurrencyExchangeIcon sx={{ color: "primary.dark", fontSize: "46px" }} />}
                            title="Finances"
                            description="Manage unregulated transactions"
                            route={`/finances/${groupId}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DashboardOptionCard
                            icon={<Groups2Icon sx={{ color: "primary.dark", fontSize: "46px" }} />}
                            title="Participants"
                            description="See other participants of this trip"
                            route={`/participants/${groupId}`}
                            groupId={groupId}
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
                            <Typography
                                variant="h5"
                                sx={{ margin: "50px", color: "primary.main" }}
                            >
                                No completed trips yet
                            </Typography>
                        </Box>
                        :
                        completedTrips}
                </Grid>
            </Container>
        </Box>
    );
};