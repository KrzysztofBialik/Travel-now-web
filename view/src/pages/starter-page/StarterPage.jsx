import { Grid, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";

import "./StarterPage.css";
import { DestinationCard } from "../../components/destinationCard/DestinationCard";
import { StarterBackground } from './starter-background/StarterBackground';
import { StarterNavbar } from '../../components/navbars/StarterNavbar';
import { BARCELONAURL, ROMEURL, LONDONURL, GLOBEURL, AMSTERDAMURL, MILANURL, LISBONURL } from "../../components/images/Images";


export const URL = '/starter';
export const NAME = "Starter";

export const StarterPage = () => {
    return (
        <div className='starter-page-wrapper'>
            <StarterNavbar />
            <StarterBackground />
            <Card
                sx={{
                    padding: '50px',
                    margin: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '20px',
                    minWidth: '1200px'
                }}
                elevation={8}
            >
                <Box className={"title"}>
                    <Typography variant="h2">Top destinations</Typography>
                </Box>
                <Container sx={{ marginBottom: '100px' }}>
                    <Grid container spacing={3}>
                        <DestinationCard size={4} content={BARCELONAURL} text={"BARCELONA"}></DestinationCard>
                        <DestinationCard size={8} content={ROMEURL} text={"ROME"}></DestinationCard>
                        <DestinationCard size={4} content={LONDONURL} text={"LONDON"}></DestinationCard>
                        <DestinationCard size={4} content={GLOBEURL} ></DestinationCard>
                        <DestinationCard size={4} content={AMSTERDAMURL} text={"AMSTERDAM"}></DestinationCard>
                        <DestinationCard size={7} content={MILANURL} text={"MILAN"}></DestinationCard>
                        <DestinationCard size={5} content={LISBONURL} text={"LISBON"}></DestinationCard>
                    </Grid>
                </Container >
            </Card>
        </div>
    );
};