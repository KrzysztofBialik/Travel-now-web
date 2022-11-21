import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { DialogContent, DialogTitle, StepLabel, Stepper, Step } from '@mui/material';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import format from 'date-fns/format';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useRef } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import "./TransportDialog.css";
import { useEffect } from 'react';
import { AddTransportDialog } from './AddTransportDialog';
import { UserTransportCard } from './UserTransportCard';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { LUFTHANSA_LOGO } from '../images/Images';


const center = { lat: 51.11006414847989, lng: 17.057531914047086 }
const Borek = { lat: 51.088444225016154, lng: 16.998315448807766 }
const Hotel = { lat: 41.38913481961653, lng: 2.156520537014847 }
const origin = "51.088444225016154, 16.998315448807766"
const destination = "41.38913481961653, 2.156520537014847"
const tripPoints = { origin: origin, destination: destination }

const exampleUserTransport = {
    name: "Flixbus",
    meetingLocation: "Dworzec autobusowy Wrocław",
    destination: "Estación de Autobuses Barcelona Nord",
    hours: 30,
    minutes: 30,
    meetingDate: "10/12/2022",
    meetingTime: new Date(2014, 8, 25, 18, 20),
    price: 1200,
    description: "This is a direct connection to Barcelona by bus."
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    // return <Zoom style={{ transitionDelay: "200ms" }} direction="up" ref={ref} {...props} />;
});

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];


export const TransportDialog = ({ open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [addTransportDialogOpen, setAddTransportDialogOpen] = useState(false);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [mapsLink, setMapsLink] = useState(`https://www.google.com/maps/dir/?api=1&origin=${tripPoints.origin}&destination=${tripPoints.destination}`)

    const originRef = useRef();

    const destinationRef = useRef();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        if (open) {
            calculateRoute();
            console.log("pobieranie trasy");
        }
    }, [open])

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: "Wrocław, Centrum Handlowe Borek",
            destination: "Mallorca 178, Eixample, 08036 Barcelona, Hiszpania",
            // eslint-disable-next-line no-undef
            travelMode: 'DRIVING'
        })
        setDirectionsResponse(results);
        console.log(results.routes[0].legs[0].distance.text);
        console.log(results.routes[0].legs[0].duration.text);
    };

    return (
        <div>
            <AddTransportDialog
                open={addTransportDialogOpen}
                onClose={() => setAddTransportDialogOpen(false)}
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
                    <Box sx={{ color: "#FFFFFF" }}>Transport options</Box>
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
                        <Box sx={{ mt: "50px", mb: "80px", width: "75%" }}>
                            <Stepper orientation="vertical">
                                <Step>
                                    <StepLabel icon={<CircleIcon sx={{ color: "primary.main" }} />}><Typography sx={{ fontSize: "28px" }}>Wrocław, centrum handlowe Borek</Typography></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel icon={<LocationOnIcon sx={{ color: "primary.main" }} />}><Typography sx={{ fontSize: "28px" }}>Mallorca 178, Eixample, 08036 Barcelona, Hiszpania</Typography></StepLabel>
                                </Step>
                            </Stepper>
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
                                            py: 3,
                                            px: 2,
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                                            Car
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
                                                            <ListItem>
                                                                <ForkRightIcon sx={{ color: "primary.main", backgroundColor: "#FFFFFF", fontSize: "48px", mr: "10px" }} />
                                                                <ListItemText primary="Distance" secondary="1998km" />
                                                            </ListItem>
                                                            <ListItem>
                                                                <AccessTimeIcon sx={{ color: "primary.main", backgroundColor: "#FFFFFF", fontSize: "48px", mr: "10px" }} />
                                                                <ListItemText primary="Duration" secondary="19h 31m" />
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
                                            Plane
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
                                                // justifyItems: "center",
                                                alignItems: "center",
                                                // justifyContent: "space-around",
                                                minHeight: "400px"
                                                // border: "2px solid black"
                                            }}
                                        >
                                            {/*------------------------------------testowanie------------------------------*/}
                                            <Box sx={{ width: "100%" }}>
                                                <List>
                                                    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
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
                                                            <Typography sx={{ fontSize: "24px", color: "primary.main" }}>LH1346</Typography>
                                                        </Box>
                                                        <Stepper activeStep={5} sx={{ width: "100%" }}>
                                                            <Step>
                                                                <StepLabel icon={<></>}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                        <Typography sx={{ fontSize: "16px" }}>
                                                                            WRO
                                                                        </Typography>
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            11:30
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                            <Step>
                                                                <StepLabel icon={<></>} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                        <AirplanemodeActiveIcon sx={{ color: "primary.main" }} />
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            1h 25min
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                            <Step>
                                                                <StepLabel icon={<></>}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                        <Typography sx={{ fontSize: "16px" }}>
                                                                            FRA
                                                                        </Typography>
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            12:55
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                        </Stepper>
                                                    </ListItem>
                                                    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
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
                                                            <Typography sx={{ fontSize: "24px", color: "primary.main" }}>LH1359</Typography>
                                                        </Box>
                                                        <Stepper activeStep={5} sx={{ width: "100%" }}>
                                                            <Step>
                                                                <StepLabel icon={<></>}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                        <Typography sx={{ fontSize: "16px" }}>
                                                                            FRA
                                                                        </Typography>
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            14:00
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                            <Step>
                                                                <StepLabel icon={<></>} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                        <AirplanemodeActiveIcon sx={{ color: "primary.main" }} />
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            1h 25min
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                            <Step>
                                                                <StepLabel icon={<></>}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                        <Typography sx={{ fontSize: "16px" }}>
                                                                            BAR
                                                                        </Typography>
                                                                        <Typography sx={{ fontSize: "10px" }}>
                                                                            15:25
                                                                        </Typography>
                                                                    </Box>
                                                                </StepLabel>
                                                            </Step>
                                                        </Stepper>
                                                    </ListItem>
                                                </List>
                                            </Box>
                                            <Box sx={{ width: "100%", height: "200px", minHeight: "200px" }}>
                                                <List>
                                                    <ListItem>
                                                        <ConnectingAirportsIcon sx={{ color: "primary.main" }} />
                                                        <ListItemText
                                                            sx={{ ml: "10px" }}
                                                            primary={"2"}
                                                        />
                                                    </ListItem>
                                                    <ListItem sx={{ mt: "-10px", display: "flex", alignItems: "flex-start" }}>
                                                        <AccessTimeIcon sx={{ color: "primary.main" }} />
                                                        <Box sx={{ display: "flex", flexDirection: "row", width: "90%", m: 0 }}>
                                                            <List sx={{ width: "50%", p: 0 }}>
                                                                <ListItem sx={{ py: 0 }}>To the airport:</ListItem>
                                                                <ListItem sx={{ py: 0 }}>Flight with transfers:</ListItem>
                                                                <ListItem sx={{ py: 0 }}>From the airport:</ListItem>
                                                                <ListItem sx={{ py: 0 }}>Total:</ListItem>
                                                            </List>
                                                            <List sx={{ width: "50%", p: 0 }}>
                                                                <ListItem sx={{ py: 0 }}>0h 30min</ListItem>
                                                                <ListItem sx={{ py: 0 }}>4h 25min</ListItem>
                                                                <ListItem sx={{ py: 0 }}>0h 45min</ListItem>
                                                                <ListItem sx={{ py: 0 }}>5h 40min</ListItem>
                                                            </List>
                                                        </Box>
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </Box>
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
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                                            Other
                                        </Typography>
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
                                            {/* <strong>Add</strong> */}
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
                                                <Grid item xs={12} md={4}>
                                                    <UserTransportCard transportData={exampleUserTransport} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <UserTransportCard transportData={exampleUserTransport} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <UserTransportCard transportData={exampleUserTransport} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <UserTransportCard transportData={exampleUserTransport} />
                                                </Grid>
                                            </Grid>
                                        </Box>
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