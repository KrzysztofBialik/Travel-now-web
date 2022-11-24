import { useState } from "react";
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

export const URL = '/dayPlan';
export const NAME = "DayPlan";

const dayPlansData = [
    {
        id: 1,
        name: "Sightseeing",
        date: "21.12.2022",
        year: 2022,
        month: 11,
        day: 21,
        iconId: 1,
        numberOfAttractions: 6
    },
    {
        id: 2,
        name: "Local cousine",
        date: "22.12.2022",
        year: 2022,
        month: 11,
        day: 22,
        iconId: 8,
        numberOfAttractions: 5
    },
    {
        id: 3,
        name: "Walking around town",
        date: "23.12.2022",
        year: 2022,
        month: 11,
        day: 23,
        iconId: 5,
        numberOfAttractions: 7
    },
];

const attractionsData = [
    {
        id: 1,
        name: "Sagrada familia",
        address: "C/ de Mallorca, 401, 08013 Barcelona, Hiszpania",
        latitude: 2.1743569898717463,
        longitude: 41.4036502739253,
        description: "Słynny, budowany od lat 80. XIX w. i nadal nieukończony kościół A. Gaudiego, z muzeum i widokiem na miasto.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipOicANzm_sbK0jBX4WnRf-U6UUb_MCfcRzdQbY-=w408-h724-k-no"
    },
    {
        id: 2,
        name: "Casa Milà",
        address: "Passeig de Gràcia, 92, 08008 Barcelona, Hiszpania",
        latitude: 2.1619131267050693,
        longitude: 41.39534022951416,
        description: "Kataloński budynek secesyjny Gaudiego z kamienną fasadą, słynący z centrum wystawowego i koncertów.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipMxnxc4S1Y5uk2ZEwZOG7vNWPbSGwFZsrIGEhyU=w408-h255-k-no"
    },
    {
        id: 3,
        name: "Plaça de Catalunya",
        address: "Plaça de Catalunya, 08002 Barcelona, Hiszpania",
        latitude: 2.1706005332686638,
        longitude: 41.38722026060981,
        description: "Otoczony drzewami plac w centrum, z rzeźbami, kawiarniami i sklepami – popularne miejsce specjalnych wydarzeń",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipORoCY9eDF_1Tgy6dDsXh6mrlYtg_Dk3HzoLwuy=w408-h544-k-no"
    },

    {
        id: 4,
        name: "Park Güell",
        address: "08024 Barcelona, Prowincja Barcelona, Hiszpania",
        latitude: 2.1528983457448176,
        longitude: 41.414683860535185,
        description: "Pokryte mozaiką budynki, schody i rzeźby w zielonym parku z muzeum Gaudiego i rozległym widokiem.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipNgwQHFyIjmdNz9RYHLND4_2hXzrBmqObHjBIfR=w408-h305-k-no"
    }
];

export const DayPlanPage = () => {

    const [createDayPlanDialogOpen, setCreateDayPlanDialogOpen] = useState(false);
    const [searchAttractionDialogOpen, setSearchAttractionDialogOpen] = useState(false);
    const [dayPlanName, setDayPlanName] = useState("");
    const [dayPlanDate, setDayPlanDate] = useState("");
    const [allAttractions, setAllAttractions] = useState([]);

    const groupStage = 2;
    const isCoordinator = true;

    const showDetailedPlan = (name, date) => {
        setAllAttractions([]);
        setDayPlanName(name);
        setDayPlanDate(date);
        setAllAttractions(attractionsData.map(attraction => (
            <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.id}>
                <AttractionCard attractionData={attraction} canModify={isCoordinator} />
            </ListItem>
        )));
    }

    var allDayPlans = dayPlansData.map(dayPlan => (
        <ListItem sx={{ p: 0, my: 1 }} key={dayPlan.id}>
            <DayPlanCard dayPlanData={dayPlan} canModify={isCoordinator} showDetailedPlan={showDetailedPlan} />
        </ListItem>
    ));

    // const allAttractions = attractionsData.map(attraction => (
    //     <ListItem sx={{ p: 0, my: 3, width: "100%" }} key={attraction.id}>
    //         <AttractionCard attractionData={attraction} canModify={isCoordinator} />
    //     </ListItem>
    // ));

    return (
        <>
            <CreateDayPlanDialog
                open={createDayPlanDialogOpen}
                onClose={() => setCreateDayPlanDialogOpen(false)}
            />
            <SearchAttractionDialog
                open={searchAttractionDialogOpen}
                onClose={() => setSearchAttractionDialogOpen(false)}
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