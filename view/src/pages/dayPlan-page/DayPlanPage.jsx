import { useState } from "react";
import { useEffect } from 'react';
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
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChurchIcon from '@mui/icons-material/Church';
import CastleIcon from '@mui/icons-material/Castle';
import SailingIcon from '@mui/icons-material/Sailing';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { currentTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { pastTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { CreateDayPlanDialog } from "../../components/dayPlans/CreateDayPlanDialog";
import { DayPlanCard } from "../../components/dayPlans/DayPlanCard";
import { AttractionCard } from "../../components/attraction/AttractionCard";
import { SearchAttractionDialog } from "../../components/attraction/SearchAttractionDialog";
import { doGet } from "../../components/utils/fetch-utils";
import { CircularProgress } from "@mui/material";
import { secondsToMilliseconds } from "date-fns/esm";

export const URL = '/dayPlan';
export const NAME = "DayPlan";

export const DayPlanPage = () => {

    const [createDayPlanDialogOpen, setCreateDayPlanDialogOpen] = useState(false);
    const [searchAttractionDialogOpen, setSearchAttractionDialogOpen] = useState(false);
    const [dayPlanName, setDayPlanName] = useState("");
    const [dayPlanDate, setDayPlanDate] = useState("");
    const [allAttractions, setAllAttractions] = useState([]);
    const [allDayPlans, setAllDayPlans] = useState([]);
    const [loading, setLodaing] = useState(true);
    const [selectedDayPlanId, setSelectedDayPlanId] = useState(0);
    const [dayPlansRaw, setdayPlansRaw] = useState([]);

    const groupStage = 2;
    const isCoordinator = true;

    const getData = async () => {
        localStorage.setItem("ACCESS_TOKEN", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUyLCJ1c2VybmFtZSI6InRlc3QifQ.F2kEvy-TDzhberOIHVxCdkUAp3RDsKYaJYSMBPkj9Fk")
        localStorage.setItem("groupId", 63)
        doGet('/api/v1/day-plan?' + new URLSearchParams({ groupId: localStorage.getItem("groupId") }).toString())
        .then(response => response.json())
        .then(json => {setdayPlansRaw(json); return json})
        .then(dayPlans => {setAllDayPlans(dayPlans.map(dayPlan => (
                        <ListItem sx={{ p: 0, my: 1 }} key={dayPlan.dayPlanId}>
                            <DayPlanCard dayPlanData={dayPlan} canModify={isCoordinator} showDetailedPlan={showDetailedPlan} onSuccess={() => getData()}/>
                        </ListItem>
                        )));
                        setLodaing(false)
                    })
        .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getData();
      }, [])

    const showDetailedPlan = (name, date, attractions, dayPlanId) => {
        setAllAttractions([]);     
        setSelectedDayPlanId(dayPlanId)
        setDayPlanName(name);
        setDayPlanDate(date);
        setAllAttractions(attractions.map(attraction => (
            <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.attractionId}>
                <AttractionCard attractionData={attraction} canModify={isCoordinator} id={dayPlanId} onDeletion={(id) => updateDayplanAttractions(id)} />
            </ListItem>
        )));
    }

    const updateDayplanAttractions = async (id) => {
        var newAttractions = await doGet('/api/v1/attraction?' + new URLSearchParams({ groupId: localStorage.getItem("groupId"), dayPlanId: id }).toString())
        .then(response => response.json());

        var dayPlanData = dayPlansRaw.find(dayPlan => dayPlan.dayPlanId === id);
        dayPlanData.dayAttractions = newAttractions;
        setdayPlansRaw(dayPlansRaw.map(dp => dp.dayPlanId === id ? dayPlanData: dp));
        
        showDetailedPlan(dayPlanData.name, dayPlanData.date, dayPlanData.dayAttractions, dayPlanData.dayPlanId)
        setAllDayPlans(dayPlansRaw.map(dayPlan => (
            <ListItem sx={{ p: 0, my: 1 }} key={dayPlan.dayPlanId}>
                <DayPlanCard dayPlanData={dayPlan} canModify={isCoordinator} showDetailedPlan={showDetailedPlan} onSuccess={() => getData()}/>
            </ListItem>
            )));   
            
    }

    

    return (
        <>
            <CreateDayPlanDialog
                open={createDayPlanDialogOpen}
                onClose={() => setCreateDayPlanDialogOpen(false)}
                onSuccess={ () => getData() }
            />
            <SearchAttractionDialog
                open={searchAttractionDialogOpen}
                onClose={() => setSearchAttractionDialogOpen(false)}
                dayPlanId={selectedDayPlanId}
                onSuccess={(id) => updateDayplanAttractions(id)}
            />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}>
                <NavigationNavbar
                    buttonsData={groupStage === 2 ? currentTripButtonsData : pastTripButtonsData}
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
                            minHeight: "100%"
                        }}
                    >
                        <Grid container spacing={10} sx={{
                            display: "flex", justifyContent: "center"
                        }}>
                            <Grid item xs={10} md={4}>
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
                                        minWidth: "400px",
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
                                            Day plans
                                        </Typography>
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
                                            loading ?
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
                                            :
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
                                        justifyContent: "space-between",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "300px",
                                        minWidth: "800px",
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
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Typography variant="h6" sx={{ color: "#FFFFFF", mr: 5 }}>
                                                Detailed plan
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
                                            onClick={() => setSearchAttractionDialogOpen(true)}
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
                                        justifyContent: "flex-start",
                                        justifyItems: "center",
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
                                                <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>
                                                    <List sx={{
                                                        // height: "100%", 
                                                        px: 0, minWidth: "90%", maxWidth: "90%"
                                                    }}>
                                                        {allAttractions}
                                                    </List>
                                                </Box>
                                                :
                                                dayPlanName === "" ?
                                                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="h4" >
                                                            Choose day plan to see the details
                                                        </Typography>
                                                    </Box>
                                                    :
                                                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="h4" >
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
}