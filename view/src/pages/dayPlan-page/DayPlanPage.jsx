import { useState } from "react";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Box } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { IconButton } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import { Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { currentTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { pastTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { CreateDayPlanDialog } from "../../components/dayPlans/CreateDayPlanDialog";
import { DayPlanCard } from "../../components/dayPlans/DayPlanCard";
import { AttractionCard } from "../../components/attraction/AttractionCard";
import { SearchAttractionDialog } from "../../components/attraction/SearchAttractionDialog";
import { SearchNearbyAttractionDialog } from "../../components/attraction/SearchNearbyAttractionDialog";
import { doGet, doGetAwait } from "../../components/utils/fetch-utils";
import { CircularProgress } from "@mui/material";
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import { secondsToMilliseconds, set } from "date-fns/esm";
import { display } from "@mui/system";
import { SuccessToast } from "../../components/toasts/SuccessToast";

export const URL = '/dayPlan/:groupId';
export const NAME = "DayPlan";

export const DayPlanPage = (props) => {

    const { groupId } = useParams();
    const [createDayPlanDialogOpen, setCreateDayPlanDialogOpen] = useState(false);
    const [searchAttractionDialogOpen, setSearchAttractionDialogOpen] = useState(false);
    const [searchAttractionNearbyDialogOpen, setSearchAttractionNearbyDialogOpen] = useState(false);
    const [dayPlanName, setDayPlanName] = useState("");
    const [dayPlanDate, setDayPlanDate] = useState("");
    const [allAttractions, setAllAttractions] = useState([]);
    const [optimizedAttractions, setOptimizedAttractions] = useState([]);
    const [allDayPlans, setAllDayPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingOptimized, setLoadingOptimized] = useState(false);
    const [selectedDayPlanId, setSelectedDayPlanId] = useState(0);
    const [dayPlansRaw, setdayPlansRaw] = useState([]);
    const [isOptimizedDayPlan, setIsOptimizedDayPlan] = useState(false);
    const [deleteDayPlanConfirmToastOpen, setDeleteDayPlanConfirmToastOpen] = useState(false);
    const [deleteAttractionConfirmToastOpen, setDeleteAttractionConfirmToastOpen] = useState(false);
    const [tripGroup, setTripGroup] = useState([])
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({});


    var isCordinator = false;

    useEffect(() => {
        getIsCoordinator();
        getData();
        getTripData();
        getLocation();
    }, []);

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
        });
    };

    // const isCorinator = async () => {
    //     var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
    //         .catch(err => console.log(err.message));
    //     var body = await resp.json();
    //     isCordinator = body;
    //     console.log(isCordinator)
    // };

    const getIsCoordinator = async () => {
        await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => setIsCoordinator(response))
            .catch(err => console.log(err.message));
    };

    // const isCorinator = async () => {
    //     var resp = await doGet('/api/v1/user-group/role?' + new URLSearchParams({ groupId: groupId, userId: sessionStorage.getItem("userId") }).toString())
    //         .catch(err => console.log(err.message));
    //     var body = await resp.json();
    //     setIsCoordinator(body);
    // };

    const getDataAfterDeleteDayPlan = () => {
        setDeleteDayPlanConfirmToastOpen(true);
        getData();
    };

    const getDataAfterDeleteAttraction = (dayPlanId) => {
        setDeleteAttractionConfirmToastOpen(true);
        updateDayplanAttractions();
    }

    const getData = async () => {
        console.log(loading);
        setLoading(true);
        doGet('/api/v1/day-plan?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(json => { setdayPlansRaw(json); return json })
            .then(dayPlans => {
                setAllDayPlans(dayPlans.map(dayPlan => (
                    <ListItem sx={{ p: 0, my: 1 }} key={dayPlan.dayPlanId}>
                        <DayPlanCard
                            dayPlanData={dayPlan}
                            groupId={groupId}
                            showDetailedPlan={showDetailedPlan}
                            onSuccess={() => getData()}
                            onSuccessDelete={() => getDataAfterDeleteDayPlan()}
                        />
                    </ListItem>
                )));
            })
            .catch(err => {
                setLoading(false);
                console.log('Request Failed', err)
            });
        setLoading(false);
    };

    const showDetailedPlan = (name, date, attractions, dayPlanId) => {
        setAllAttractions([]);
        setSelectedDayPlanId(dayPlanId)
        setDayPlanName(name);
        setDayPlanDate(date);
        setIsOptimizedDayPlan(false);
        setAllAttractions(attractions.map(attraction => (
            <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.attractionId}>
                <AttractionCard
                    attractionData={attraction}
                    groupId={groupId}
                    id={dayPlanId}
                    onDeletion={(dayPlanId) => getDataAfterDeleteAttraction(dayPlanId)}
                />
            </ListItem>
        )));
    };

    const updateDayplanAttractions = async () => {
        setLoadingOptimized(true);
        console.log("update")
        var newAttractions = await doGet('/api/v1/attraction?' + new URLSearchParams({ groupId: groupId, dayPlanId: selectedDayPlanId }).toString())
            .then(response => response.json());
        var dayPlanData = dayPlansRaw.find(dayPlan => dayPlan.dayPlanId === selectedDayPlanId);
        dayPlanData.dayAttractions = newAttractions;
        setdayPlansRaw(dayPlansRaw.map(dp => dp.dayPlanId === selectedDayPlanId ? dayPlanData : dp));
        showDetailedPlan(dayPlanData.name, dayPlanData.date, dayPlanData.dayAttractions, dayPlanData.dayPlanId);
        setAllDayPlans(dayPlansRaw.map(dayPlan => (
            <ListItem sx={{ p: 0, my: 1 }} key={dayPlan.dayPlanId}>
                <DayPlanCard
                    dayPlanData={dayPlan}
                    groupId={groupId}
                    showDetailedPlan={showDetailedPlan}
                    onSuccess={() => getData()}
                    onSuccessDelete={() => getDataAfterDeleteDayPlan()} />
            </ListItem>
        )));
        console.log("end of update")
        setLoadingOptimized(false);
    };

    const getTripData = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setTripGroup(response);
                return response;
            })
            .catch(err => console.log('Request Failed', err));
    };

    const getOptimized = async () => {
        setLoadingOptimized(true);
        await doGet('/api/v1/attraction/optimize/' + selectedDayPlanId)
            .then(response => response.json())
            .then(attractions => setOptimizedAttractions(attractions.map(attraction => (
                <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.attraction.attractionId}>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "flex-start", width: "40px", mr: 1 }}>
                            <TripOriginRoundedIcon size="bold" sx={{ fontSize: "40px", color: "secondary.main" }} />
                            {attraction.distanceToNextAttraction ?
                                <Box sx={{ display: "flex", flexDirection: "row", height: "100%", width: "40px" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "19px", transform: "rotate(180deg)" }}>
                                        <Typography sx={{ textOrientation: "mixed", writingMode: "vertical-rl", color: "secondary.dark", fontWeight: "bold", mb: -4 }}>
                                            {(attraction.distanceToNextAttraction / 1000).toString().substring(0, 4)} km
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "21px" }}>
                                        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3, borderColor: "secondary.main", mb: -2 }} />
                                    </Box>
                                </Box>
                                :
                                <Box></Box>
                            }
                        </Box>
                        <AttractionCard
                            attractionData={attraction.attraction}
                            groupId={groupId}
                            id={selectedDayPlanId}
                            onDeletion={(selectedDayPlanId) => getDataAfterDeleteAttraction(selectedDayPlanId)}
                        />
                    </Box>
                </ListItem>
            ))))
            .catch(err => console.log('Request Failed', err));
        setLoadingOptimized(false);
    };


    const optimizeDayPlan = () => {
        if (isOptimizedDayPlan) {
            updateDayplanAttractions();
        }
        else {
            getOptimized();
        }
        setIsOptimizedDayPlan(!isOptimizedDayPlan);
    };

    // const allAttractions = attractionsData.map(attraction => (
    //     <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.id}>
    //         <AttractionCard attractionData={attraction} canModify={isCoordinator} />
    //     </ListItem>
    // ));

    return (
        <>
            <SuccessToast
                open={deleteDayPlanConfirmToastOpen}
                onClose={() => setDeleteDayPlanConfirmToastOpen(false)}
                message={"Day plan deleted successfully"}
            />
            <SuccessToast
                open={deleteAttractionConfirmToastOpen}
                onClose={() => setDeleteAttractionConfirmToastOpen(false)}
                message={"Attraction deleted successfully"}
            />
            <CreateDayPlanDialog
                open={createDayPlanDialogOpen}
                onClose={() => setCreateDayPlanDialogOpen(false)}
                onSuccess={() => getData()}
                groupId={groupId}
                startDate={tripGroup.startDate}
                endDate={tripGroup.endDate}
            />
            <SearchAttractionDialog
                open={searchAttractionDialogOpen}
                onClose={() => setSearchAttractionDialogOpen(false)}
                dayPlanId={selectedDayPlanId}
                onSuccess={(id) => updateDayplanAttractions(id)}
            />
            <SearchNearbyAttractionDialog
                open={searchAttractionNearbyDialogOpen}
                onClose={() => setSearchAttractionNearbyDialogOpen(false)}
                dayPlanId={selectedDayPlanId}
                onSuccess={(id) => updateDayplanAttractions(id)}
            />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}>
                <NavigationNavbar
                    buttonsData={currentTripButtonsDataWithGroupId(groupId)}
                    groupId={groupId}
                />
                <Box sx={{
                    pt: 10,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    minWidth: "1200px",
                    minHeight: "100%",
                    margin: 0
                }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minWidth: "90%",
                            maxWidth: "95%",
                            minHeight: "100%",
                            mb: 5
                        }}
                    >
                        <Grid container spacing={10}
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <Grid item xs={10} md={4}>
                                <Card
                                    sx={{
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "300px",
                                        minWidth: "400px",
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
                                            <FormatListBulletedIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Day plans
                                            </Typography>
                                        </Box>
                                        {isCoordinator &&
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    borderRadius: "20px",
                                                    "&:hover": { backgroundColor: "secondary.dark" }
                                                }}
                                                onClick={() => setCreateDayPlanDialogOpen(true)}
                                            >
                                                <AddIcon />
                                                Add
                                            </Button>
                                        }
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
                                            // loading ?
                                            //     <Box
                                            //         sx={{
                                            //             display: "flex",
                                            //             flexDirection: "column",
                                            //             justifyContent: "center",
                                            //             alignItems: "center",
                                            //             minHeight: "400px"
                                            //             // border: "2px solid black"
                                            //         }}
                                            //     >
                                            //         <CircularProgress />
                                            //     </Box>
                                            //     :
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    minHeight: "400px"
                                                    // border: "2px solid black"
                                                }}
                                            >
                                                {/* No day plans created */}
                                                <List sx={{ p: 0 }}>
                                                    {allDayPlans}
                                                </List>
                                            </Box>
                                        }
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={10} md={8} >
                                <Card
                                    sx={{
                                        height: "100%",
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "300px",
                                        minWidth: "700px",
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
                                            <SearchIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Detailed plan
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {selectedDayPlanId > 0 &&
                                                <FormControlLabel
                                                    value="Optimize day plan"
                                                    control={<Switch color="secondary" onChange={optimizeDayPlan} checked={isOptimizedDayPlan} />}
                                                    label="Optimize day plan"
                                                    labelPlacement="start"
                                                    sx={{ mr: 4, color: "#FFFFFF" }}
                                                />
                                            }
                                            {(isCoordinator && selectedDayPlanId > 0) &&
                                                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                    <Tooltip title={Object.keys(currentLocation).length === 0 && "Please allow sharing your location to add nearby attractions"}>
                                                        <span>
                                                            <Button
                                                                variant="contained"
                                                                disabled={Object.keys(currentLocation).length === 0}
                                                                sx={{
                                                                    backgroundColor: "secondary.main",
                                                                    borderRadius: "20px",
                                                                    "&:hover": { backgroundColor: "secondary.dark" },
                                                                    mr: 2,
                                                                    minWidth: 10
                                                                }}
                                                                onClick={() => setSearchAttractionNearbyDialogOpen(true)}
                                                            >
                                                                <AddIcon />
                                                                Add nearby
                                                            </Button>
                                                        </span>
                                                    </Tooltip>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: "secondary.main",
                                                            borderRadius: "20px",
                                                            "&:hover": { backgroundColor: "secondary.dark" }
                                                        }}
                                                        onClick={() => setSearchAttractionDialogOpen(true)}
                                                    >
                                                        <AddIcon />
                                                        Add
                                                    </Button>
                                                </Box>
                                            }
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        <Box
                                            sx={{
                                                // height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyItems: "flex-start",
                                                alignItems: "flex-start",
                                                justifyContent: "flex-start",
                                                minHeight: "400px"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    // height: "100%",
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    justifyContent: "flex-start",
                                                    ml: 2
                                                }}
                                            >
                                                <Typography variant="h4" sx={{ mb: 1 }}>
                                                    {dayPlanName}
                                                </Typography>
                                                <Typography variant="h5" color="text.secondary">
                                                    {dayPlanDate}
                                                </Typography>
                                            </Box>
                                            {/* Add attractions to see the detailed plan */}
                                            {allAttractions.length > 0 ?
                                                // loadingOptimized ?
                                                //     <Box
                                                //         sx={{
                                                //             display: "flex",
                                                //             flexDirection: "column",
                                                //             justifyContent: "center",
                                                //             alignItems: "center",
                                                //             minHeight: "400px",
                                                //             width: '100%'
                                                //             // border: "2px solid black"
                                                //         }}
                                                //     >
                                                //         <CircularProgress />
                                                //     </Box>
                                                //     :
                                                <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>
                                                    <List sx={{
                                                        // height: "100%", 
                                                        px: 0, minWidth: "700px", maxWidth: "700px"
                                                    }}>
                                                        {isOptimizedDayPlan ? optimizedAttractions : allAttractions}
                                                    </List>
                                                </Box>
                                                :
                                                dayPlanName === "" ?
                                                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", minWidth: "700px", maxWidth: "700px" }} >
                                                            Choose day plan to see the details
                                                        </Typography>
                                                    </Box>
                                                    :
                                                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", minWidth: "700px", maxWidth: "700px" }} >
                                                            Add attractions to see the detailed plan
                                                        </Typography>
                                                    </Box>
                                            }
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box >
            </Box >
        </>
    );
};