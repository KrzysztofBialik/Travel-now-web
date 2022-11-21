import { useState } from "react";
import { Avatar, Box } from "@mui/material";
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
import LocationOnIcon from '@mui/icons-material/LocationOn';


import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { currentTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { pastTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { CreateDayPlanDialog } from "../../components/dayPlans/CreateDayPlanDialog";

export const URL = '/dayPlan';
export const NAME = "DayPlan";

export const DayPlanPage = () => {

    const [createDayPlanDialogOpen, setCreateDayPlanDialogOpen] = useState(false);

    const groupStage = 2;
    const isCoordinator = true;

    return (
        <>
            <CreateDayPlanDialog
                open={createDayPlanDialogOpen}
                onClose={() => setCreateDayPlanDialogOpen(false)}
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
                        {/* <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "30%", height: "100%" }}>
                            <Typography variant="h2" sx={{ mb: 4 }}>
                                Day plans
                            </Typography>
                            <Card sx={{ height: "400px", minWidth: "90%" }}>
                                <Button>Add</Button>
                            </Card>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "70%", height: "100%" }}>
                            <Typography variant="h2" sx={{ mb: 4 }}>
                                Detailed plan
                            </Typography>
                            <Card sx={{ height: "400px", minWidth: "90%", mx: 4 }}>

                            </Card>
                        </Box>
                    </Box> */}
                        <Grid container spacing={10} sx={{
                            display: "flex", justifyContent: "center"
                        }}>
                            <Grid item xs={10} md={4}>
                                {/* <Card sx={{ minHeight: "700px", minWidth: "90%", display: "flex", flexDirection: "column", alignItems: "center", }}>
                                <Typography variant="h2" sx={{ my: 5, whiteSpace: "nowrap" }}>
                                    Day plans
                                </Typography>
                                <Card sx={{ minHeight: "400px", width: "90%", borderRadius: "20px" }}
                                    elevation={10}
                                >
                                    test
                                </Card>
                            </Card> */}
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
                                            Day plans
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                borderRadius: "20px",
                                                mr: "20px",
                                                "&:hover": { backgroundColor: "secondary.dark" }
                                            }}
                                            onClick={() => setCreateDayPlanDialogOpen(true)}
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
                                                justifyContent: "flex-start",
                                                minHeight: "400px"
                                                // border: "2px solid black"
                                            }}
                                        >
                                            {/* No day plans created */}
                                            <List sx={{ p: 0 }}>
                                                <ListItem sx={{ p: 0, my: 1 }}>
                                                    <Card sx={{ width: "100%", borderRadius: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                            {/* <ListItemIcon sx={{ ml: 2, my: 1 }}> */}
                                                            {/* <Avatar sx={{ backgroundColor: "#FFFFFF", borderColor: "primary.main", border: "1px 1px primary.main" }}> */}
                                                            <ChurchIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
                                                            {/* </Avatar> */}
                                                            {/* </ListItemIcon> */}
                                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                <ListItemText primary={"Sightseeing"} secondary={"20.12.2022"} />
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{
                                                            display: "flex", flexDirection: "row", alignItems: "center", mx: 2, my: 1
                                                        }}>
                                                            <Typography
                                                                sx={{
                                                                    color: "secondary.main",
                                                                    fontSize: "20px",
                                                                    padding: 0
                                                                }}
                                                            >
                                                                4
                                                            </Typography>
                                                            <LocationOnIcon sx={{ color: "secondary.main", fontSize: "28px" }} />
                                                        </Box>
                                                    </Card>
                                                </ListItem>
                                                <ListItem sx={{ p: 0, my: 1 }}>
                                                    <Card sx={{ width: "100%", borderRadius: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                            {/* <ListItemIcon sx={{ ml: 2, my: 1 }}> */}
                                                            {/* <Avatar sx={{ backgroundColor: "#FFFFFF", borderColor: "primary.main", border: "1px 1px primary.main" }}> */}
                                                            <RestaurantIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
                                                            {/* </Avatar> */}
                                                            {/* </ListItemIcon> */}
                                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                <ListItemText primary={"Sightseeing"} secondary={"21.12.2022"} />
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{
                                                            display: "flex", flexDirection: "row", alignItems: "center", mx: 2, my: 1
                                                        }}>
                                                            <Typography
                                                                sx={{
                                                                    color: "secondary.main",
                                                                    fontSize: "20px",
                                                                    padding: 0
                                                                }}
                                                            >
                                                                5
                                                            </Typography>
                                                            <LocationOnIcon sx={{ color: "secondary.main", fontSize: "28px" }} />
                                                        </Box>
                                                    </Card>
                                                </ListItem>
                                                <ListItem sx={{ p: 0, my: 1 }}>
                                                    <Card sx={{ width: "100%", borderRadius: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                            {/* <ListItemIcon sx={{ ml: 2, my: 1 }}> */}
                                                            {/* <Avatar sx={{ backgroundColor: "#FFFFFF", borderColor: "primary.main", border: "1px 1px primary.main" }}> */}
                                                            <DirectionsWalkIcon sx={{ color: "primary.main", fontSize: "40px", mx: 2, my: 1 }} />
                                                            {/* </Avatar> */}
                                                            {/* </ListItemIcon> */}
                                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                <ListItemText primary={"Sightseeing"} secondary={"22.12.2022"} />
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{
                                                            display: "flex", flexDirection: "row", alignItems: "center", mx: 2, my: 1
                                                        }}>
                                                            <Typography
                                                                sx={{
                                                                    color: "secondary.main",
                                                                    fontSize: "20px",
                                                                    padding: 0
                                                                }}
                                                            >
                                                                7
                                                            </Typography>
                                                            <LocationOnIcon sx={{ color: "secondary.main", fontSize: "28px" }} />
                                                        </Box>
                                                    </Card>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={10} md={8} >
                                {/* <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "800px", height: "100%", mx: 4 }}>
                                <Typography variant="h2" sx={{ my: 5, whiteSpace: "nowrap" }}>
                                    Detailed plan
                                </Typography>
                            </Card> */}
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
                                        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                                            Detailed plan
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                borderRadius: "20px",
                                                mr: "20px",
                                                "&:hover": { backgroundColor: "secondary.dark" }
                                            }}
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
                                            }}
                                        >
                                            Add attractions to see the detailed plan
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