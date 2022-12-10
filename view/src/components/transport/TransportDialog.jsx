import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import { DialogContent, DialogTitle, StepLabel, Stepper, Step, CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import format from 'date-fns/format';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useRef } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import FlightIcon from '@mui/icons-material/Flight';
import CommuteIcon from '@mui/icons-material/Commute';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import "./TransportDialog.css";
import { useEffect } from 'react';
import { AddTransportDialog } from './AddTransportDialog';
import { UserTransportCard } from './UserTransportCard';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { LUFTHANSA_LOGO } from '../images/Images';
import { doGet, doPost } from "../../components/utils/fetch-utils";
import * as durationn from 'duration-fns'
import { parseISO } from 'date-fns';
import Flight from '@mui/icons-material/Flight';


const center = { lat: 51.11006414847989, lng: 17.057531914047086 }
const origin = "51.088444225016154, 16.998315448807766"
const destination = "41.38913481961653, 2.156520537014847"
const tripPoints = { origin: origin, destination: destination }

// const exampleUserTransport = {
//     name: "Flixbus",
//     meetingLocation: "Dworzec autobusowy Wrocław",
//     destination: "Estación de Autobuses Barcelona Nord",
//     hours: 30,
//     minutes: 30,
//     meetingDate: "10/12/2022",
//     meetingTime: new Date(2014, 8, 25, 18, 20),
//     price: 1200,
//     description: "This is a direct connection to Barcelona by bus."
// }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    // return <Zoom style={{ transitionDelay: "200ms" }} direction="up" ref={ref} {...props} />;
});

export const TransportDialog = ({ open, onClose, accommodationId, currency }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [isCarTransport, setIsCarTransport] = useState(false);
    const [isPlaneTransport, setIsPlaneTransport] = useState(false);
    const [addTransportDialogOpen, setAddTransportDialogOpen] = useState(false);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [mapsLink, setMapsLink] = useState(`https://www.google.com/maps/dir/?api=1&origin=${tripPoints.origin}&destination=${tripPoints.destination}`);
    const [transportDataRaw, setTransportDataRaw] = useState("");
    const [carTransportData, setCarTransportData] = useState("");
    const [planeTransportData, setPlaneTransportData] = useState("");
    const [loading, setLoading] = useState(true);
    const [planeDataList, setPlaneDataList] = useState([]);
    const [planeDurations, setPlaneDurations] = useState([]);
    const [userTransport, setUserTransport] = useState([]);
    const [source, setSource] = useState([]);
    const [destination, setDestination] = useState([]);

    const originRef = useRef();

    const destinationRef = useRef();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const getData = async () => {
        setLoading(true);
        await doPost('/api/v1/transport?' + new URLSearchParams({ accommodationId: accommodationId }).toString())
            .then(response => response.json())
            .then(json => {
                if (json.length !== 0) {
                    setTransportDataRaw(json);
                    setSource(json[0].source);
                    setDestination(json[0].destination);
                }
                return json;
            })
            .then(json => {
                if (json.length !== 0) {
                    var car = json.filter(transport => transport.transportTypeJson === 2);
                    setCarTransportData(car.length !== 0 ? car : [])
                    setMapsLink(`https://www.google.com/maps/dir/?api=1&origin=${car[0].source}&destination=${car[0].destination}`)

                    var plane = json.filter(transport => transport.transportTypeJson === 1);
                    setPlaneTransportData(plane.length !== 0 ? plane : [])
                    setPlaneDataList(plane.length !== 0 ? json.filter(transport => transport.transportTypeJson === 1)[0].flight.map(plane => mapPlaneData(plane)) : [])
                    setPlaneDurations(plane.length !== 0 ? mapPlaneDurations(json.filter(transport => transport.transportTypeJson === 1)[0]) : [])
                    setUserTransport(json.filter(transport => transport.transportTypeJson === 3).map(transport => mapUserTransport(transport)))
                }
            }
            )
            .catch(err => console.log('Request Failed', err));
        setLoading(false);
    };

    useEffect(() => {
        calculateRoute();
    }, [carTransportData]);

    const mapPlaneData = (plane) => {
        return (
            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} key={plane.flightId}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Box
                        sx={{
                            backgroundImage: `url(${LUFTHANSA_LOGO})`,
                            height: '28px',
                            width: "28px",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            ml: "10px",
                            mr: "10px"
                        }} />
                    <Typography sx={{ fontSize: "24px", color: "primary.main" }}>{plane.flightNumber}</Typography>
                </Box>
                <Stepper activeStep={5} sx={{ width: "100%" }}>
                    <Step>
                        <StepLabel icon={<></>}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography sx={{ fontSize: "16px" }}>
                                    {plane.departureAirport}
                                </Typography>
                                <Typography sx={{ fontSize: "10px" }}>
                                    {format(parseISO(plane.departureTime), 'HH:mm')}
                                </Typography>
                            </Box>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel icon={<></>} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <AirplanemodeActiveIcon sx={{ color: "primary.main" }} />
                                <Typography sx={{ fontSize: "10px" }}>
                                    {parseTime(plane.flightDuration)}
                                </Typography>
                            </Box>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel icon={<></>}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography sx={{ fontSize: "16px" }}>
                                    {plane.arrivalAirport}
                                </Typography>
                                <Typography sx={{ fontSize: "10px" }}>
                                    {format(parseISO(plane.arrivalTime), 'HH:mm')}
                                </Typography>
                            </Box>
                        </StepLabel>
                    </Step>
                </Stepper>
            </ListItem>
        )
    };

    const mapPlaneDurations = (travel) => {
        return ([
            <ListItem key={1} sx={{ py: 0 }}>{parseTime(travel.flight[0].travelToAirportDuration)}</ListItem>,
            <ListItem key={2} sx={{ py: 0 }}>{constructString(subtractDurations(subtractDurations(durationn.parse(travel.duration), durationn.parse(travel.flight[0].travelToAirportDuration)), durationn.parse(travel.flight[travel.flight.length - 1].travelToAccommodationDuration)))}</ListItem>,
            <ListItem key={3} sx={{ py: 0 }}>{parseTime(travel.flight[travel.flight.length - 1].travelToAccommodationDuration)}</ListItem>,
            <ListItem key={4} sx={{ py: 0 }}>{parseTime(travel.duration)}</ListItem>
        ]
        )
    };

    const mapUserTransport = (transport) => {
        return (<Grid item xs={12} md={4}>
            <UserTransportCard transportData={transport} onSuccess={() => getData()} accommodationId={accommodationId} />
        </Grid>)
    };

    const subtractDurations = (dur1, dur2) => {
        var dur1Hours = (dur1.days * 24) + dur1.hours + (dur1.minutes / 60)
        var dur2Hours = (dur2.days * 24) + dur2.hours + (dur2.minutes / 60)
        var differnce = dur1Hours - dur2Hours;
        return { 'days': Math.floor(differnce / 24), 'hours': (differnce - (Math.floor(differnce / 24) * 24) - (differnce - Math.floor(differnce))), 'minutes': Math.floor((differnce - Math.floor(differnce)) * 60) }

    };

    useEffect(() => {
        if (open) {
            getData();
            calculateRoute();
        }
    }, [open]);

    const parseTime = (duration) => {
        var time = durationn.parse(duration);
        return constructString(time)
    };

    const constructString = (time) => {
        var result = "";
        if (time.days !== 0) {
            result = result + time.days + "d "
        }

        if (time.hours !== 0) {
            result = result + time.hours + "h "
        }

        if (time.minutes !== 0) {
            result = result + time.minutes + "m "
        }
        return result;
    };

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: carTransportData[0].source,
            destination: carTransportData[0].destination,
            // eslint-disable-next-line no-undef
            travelMode: 'DRIVING'
        })
        setDirectionsResponse(results);
    };

    return (
        <div>
            <AddTransportDialog
                open={addTransportDialogOpen}
                onClose={() => setAddTransportDialogOpen(false)}
                accommodationId={accommodationId}
                onSuccess={() => getData()}
                currency={currency}
            />
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Box sx={{ color: "#FFFFFF" }}>
                        Transport options
                    </Box>
                    <Button variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            backgroundColor: "secondary.main",
                            // borderColor: "#FFFFFF",
                            color: "#000000",
                            "&:hover": {
                                backgroundColor: "secondary.dark"
                            }
                        }}
                        onClick={(onClose)}
                    >
                        Close
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        mx: "100px",
                        display: "flex",
                        justifyContent: 'center',
                        // alignItems: 'center',
                        flexDirection: "column",
                        minWidth: "1200px"
                    }}>
                        <Box sx={{ mt: "50px", mb: "80px", width: "75%" }} elevation={10}>
                            {loading ?
                                <Box
                                    sx={{
                                        width: "200px",
                                        height: "100px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <CircularProgress sx={{ color: "primary.main" }} />
                                </Box>
                                :
                                <Stepper orientation="vertical">
                                    <Step>
                                        <StepLabel icon={<CircleIcon sx={{ color: "primary.main" }} />}>
                                            <Typography sx={{ fontSize: "28px" }}>
                                                {source}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel icon={<LocationOnIcon sx={{ color: "primary.main" }} />}>
                                            <Typography sx={{ fontSize: "28px" }}>
                                                {destination}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                </Stepper>
                            }
                        </Box>
                        <Grid container item xs={12} spacing={10}
                            sx={{
                                display: "flex", justifyContent: "center"
                            }}>
                            <Grid item xs={10} md={6}>
                                <Card
                                    sx={{
                                        minHeight: "500px",
                                        minWidth: "500px",
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
                                            py: 2,
                                            px: 2,
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <TimeToLeaveIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Car
                                            </Typography>
                                        </Box>
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
                                        {
                                            (!loading && isLoaded) ?
                                                (carTransportData.length === 0) ?
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyItems: "center",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            minHeight: "400px"
                                                        }}
                                                    >
                                                        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Grid item xs={12}>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        flexDirection: "column",
                                                                        minHeight: "400px",
                                                                        minWidth: "400px",
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: "24px", color: "primary.main" }}>
                                                                        No car transport found
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyItems: "center",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            minHeight: "400px"
                                                        }}
                                                    >
                                                        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Grid item xs={5}>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        flexDirection: "column",
                                                                        minHeight: "400px"
                                                                    }}
                                                                >
                                                                    <List sx={{ width: '100%', maxWidth: 360 }}>
                                                                        <ListItem key={1}>
                                                                            <ForkRightIcon sx={{ color: "primary.main", backgroundColor: "#FFFFFF", fontSize: "48px", mr: "10px" }} />
                                                                            <ListItemText primary="Distance" secondary={Math.round(carTransportData[0].distanceInKm / 1000 * 100) / 100 + 'km'} />
                                                                        </ListItem>
                                                                        <ListItem key={2}>
                                                                            <AccessTimeIcon sx={{ color: "primary.main", backgroundColor: "#FFFFFF", fontSize: "48px", mr: "10px" }} />
                                                                            <ListItemText primary="Duration" secondary={parseTime(carTransportData[0].duration)} />
                                                                        </ListItem>
                                                                    </List>
                                                                    <Button
                                                                        variant="outlined"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        href={mapsLink}
                                                                        sx={{
                                                                            borderRadius: "20px",
                                                                            m: 3,
                                                                            width: "180px",
                                                                            '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main" }
                                                                        }}
                                                                    >
                                                                        <MapIcon sx={{ mr: "10px" }} />
                                                                        See in maps
                                                                    </Button>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                {isLoaded ?
                                                                    <GoogleMap
                                                                        zoom={14}
                                                                        center={center}
                                                                        mapContainerClassName="map"
                                                                    >
                                                                        <MarkerF position={center} />
                                                                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ strokeColor: "#2ab7ca" }} />}
                                                                    </GoogleMap>
                                                                    :
                                                                    <Typography variant="h1">Loading...</Typography>}
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                :
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: "400px"
                                                        // border: "2px solid black"
                                                    }}
                                                >
                                                    <CircularProgress />
                                                </Box>
                                        }
                                    </Box>
                                </Card>
                            </Grid>

                            {/*------------------------------------Plane------------------------------------*/}
                            <Grid item xs={10} md={6}>
                                <Card
                                    sx={{
                                        minHeight: "500px",
                                        minWidth: "500px",
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
                                            py: 2,
                                            px: 2,
                                            // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <Flight sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Plane
                                            </Typography>
                                        </Box>
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
                                        {
                                            !loading ?
                                                (planeTransportData.length === 0) ?
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyItems: "center",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            minHeight: "400px"
                                                        }}
                                                    >
                                                        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Grid item xs={12}>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        flexDirection: "column",
                                                                        minHeight: "400px",
                                                                        minWidth: "400px",
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: "24px", color: "primary.main" }}>
                                                                        No plane transport found
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            // justifyItems: "center",
                                                            alignItems: "center",
                                                            // justifyContent: "space-around",
                                                            minHeight: "400px"
                                                            // border: "2px solid black"
                                                        }}
                                                    >
                                                        <Box sx={{ width: "100%" }}>
                                                            <List>
                                                                {planeDataList}
                                                            </List>
                                                        </Box>
                                                        <Box sx={{ width: "100%", height: "200px", minHeight: "200px" }}>
                                                            <List>
                                                                <ListItem key={1}>
                                                                    <ConnectingAirportsIcon sx={{ color: "primary.main" }} />
                                                                    <ListItemText
                                                                        sx={{ ml: "10px" }}
                                                                        primary={"2"}
                                                                    />
                                                                </ListItem>
                                                                <ListItem key={2} sx={{ mt: "-10px", display: "flex", alignItems: "flex-start" }}>
                                                                    <AccessTimeIcon sx={{ color: "primary.main" }} />
                                                                    <Box sx={{ display: "flex", flexDirection: "row", width: "90%", m: 0 }}>
                                                                        <List sx={{ width: "50%", p: 0 }}>
                                                                            <ListItem key={3} sx={{ py: 0 }}>To the airport:</ListItem>
                                                                            <ListItem key={4} sx={{ py: 0 }}>Flight with transfers:</ListItem>
                                                                            <ListItem key={5} sx={{ py: 0 }}>From the airport:</ListItem>
                                                                            <ListItem key={6} sx={{ py: 0 }}>Total:</ListItem>
                                                                        </List>
                                                                        <List sx={{ width: "50%", p: 0 }}>
                                                                            {planeDurations}
                                                                        </List>
                                                                    </Box>
                                                                </ListItem>
                                                            </List>
                                                        </Box>
                                                    </Box>
                                                :
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: "400px"
                                                        // border: "2px solid black"
                                                    }}
                                                >
                                                    <CircularProgress />
                                                </Box>
                                        }

                                    </Box>
                                </Card>
                            </Grid>
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
                                            py: 2,
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
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <CommuteIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Other
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                borderRadius: "20px",
                                                mr: "20px",
                                                "&:hover": { backgroundColor: "secondary.dark" }
                                            }}
                                            onClick={() => setAddTransportDialogOpen(true)}
                                        >
                                            <AddIcon />
                                            Add
                                        </Button>
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
                                        {
                                            !loading ?
                                                (userTransport.length === 0) ?
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyItems: "center",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            minHeight: "400px"
                                                        }}
                                                    >
                                                        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Grid item xs={12}>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        flexDirection: "column",
                                                                        minHeight: "400px",
                                                                        minWidth: "400px",
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: "24px", color: "primary.main" }}>
                                                                        No user transport added
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyItems: "center",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            minHeight: "400px"
                                                            // border: "2px solid black"
                                                        }}
                                                    >
                                                        <Grid container item xs={12}
                                                            spacing={4}
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "flex-start",
                                                                alignItems: 'flex-start',
                                                                my: "0px",
                                                                // gridAutoRows: "1fr"
                                                                // gap: "50px"
                                                                // rowGap: "50px",
                                                                // columnGap: "50px"
                                                            }}
                                                        >
                                                            {userTransport}
                                                        </Grid>
                                                    </Box>
                                                :
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: "400px"
                                                        // border: "2px solid black"
                                                    }}
                                                >
                                                    <CircularProgress />
                                                </Box>
                                        }
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog >
        </div >
    );
};