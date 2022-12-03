import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Icon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { CardHeader } from '@mui/material';
import { CardContent } from '@mui/material';
import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from "date-fns";
import { isWeekend } from "date-fns";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AvailabilityTable } from "../../components/availability/AvailabilityTable";
import { DateRangePickerDialog } from "../../components/availability/DateRangePickerDialog";
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { futureTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';


export const URL = '/availability';
export const NAME = "Availability";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Icon {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const availabilities = [
    {
        id: 1,
        startDate: new Date(2022, 10, 21),
        endDate: new Date(2022, 11, 11),
        user: "BoBa",
        disabled: true
    },
    {
        id: 2,
        startDate: new Date(2022, 11, 14),
        endDate: new Date(2022, 11, 18),
        user: "BoBa",
        disabled: true
    },
    {
        id: 3,
        startDate: new Date(2022, 11, 30),
        endDate: new Date(2023, 0, 8),
        user: "BoBa",
        disabled: true
    }
];


export const AvailabilityPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [dateRangePickerDialogOpen, setDateRangePickerDialogOpen] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addAvailabilityAction = () => {
        setDateRangePickerDialogOpen(true);
    };

    const restrictedDays = availabilities.flatMap(availability =>
        eachDayOfInterval({ start: availability.startDate, end: availability.endDate }));

    function customDayContent(day) {
        var fontWeight = 100;
        var color = "#000000";
        if (isWeekend(day)) {
            fontWeight = 700;
            color = "#ffc928"
        }
        return (
            <div>
                {/* <span>{format(day, "d")}</span> */}
                <Typography sx={{ color: { color }, fontWeight: { fontWeight }, fontSize: "12px" }}>{format(day, "d")}</Typography>
            </div>
        )
    }

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100%'
        }}>
            <NavigationNavbar buttonsData={futureTripButtonsData} />
            <DateRangePickerDialog open={dateRangePickerDialogOpen}
                onClose={() => setDateRangePickerDialogOpen(false)}
                initialRange={[{ startDate: null, endDate: null, key: "selection" }]}
                restrictedDays={restrictedDays}
                rangeChange={() => { }} />
            <Box sx={{
                py: 10,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                minWidth: "1000px"
            }}
            >
                <Card
                    sx={{
                        height: "100%", width: "80%", minWidth: "1000px", borderRadius: "10px"
                    }}
                    elevation={0}
                >
                    <CardHeader
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "primary.main",
                            color: "#FFFFFF",
                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                        }}
                        title="My Availability"
                        titleTypographyProps={{ variant: 'h5' }}
                        action={
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Box>
                                    <Link to="/availability/optimizedDates">
                                        <Button variant="contained"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                borderRadius: "20px",
                                                mr: "20px",
                                                "&:hover": { backgroundColor: "secondary.dark" }
                                            }}>
                                            See optimized dates
                                        </Button>
                                    </Link>

                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "secondary.main",
                                            borderRadius: "20px",
                                            mr: "20px",
                                            "&:hover": { backgroundColor: "secondary.dark" }
                                        }}
                                        onClick={addAvailabilityAction}
                                    >
                                        <AddIcon />
                                        Add
                                        {/* <strong>Add</strong> */}
                                    </Button>
                                </Box>
                            </Box>
                        }
                    >
                    </CardHeader>
                    <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            m: "20px"
                        }}>
                            <DateRange
                                ranges={availabilities}
                                onChange={null}
                                months={3}
                                weekStartsOn={1}
                                shownDate={new Date()}
                                direction="horizontal"
                                rangeColors={["#2ab7ca"]}
                                color={"#2ab7ca"}
                                fixedHeight={true}
                                dateDisplayFormat={"dd.MM.yyyy"}
                                startDatePlaceholder="Start date"
                                endDatePlaceholder="End date"
                                showDateDisplay={false}
                                showMonthAndYearPickers={false}
                                showPreview={false}
                                dayContentRenderer={customDayContent}
                            />
                        </Box>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Box sx={{ display: "flex", mb: "20px" }}>
                            <Button
                                variant="contained"
                                sx={{ color: "#FFFFFF", borderRadius: "20px" }}
                                onClick={handleExpandClick}
                            >
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    sx={{ ml: -1 }}
                                >
                                    <ExpandMoreIcon sx={{ color: "#FFFFFF" }} />
                                </ExpandMore>
                                Details
                            </Button>
                        </Box>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <AvailabilityTable availabilities={availabilities} />
                        </CardContent>
                    </Collapse>
                </Card >
            </Box>
        </Box>
    );
};