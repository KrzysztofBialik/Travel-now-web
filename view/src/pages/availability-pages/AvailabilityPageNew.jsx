import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Icon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { CardContent } from '@mui/material';
import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from "date-fns";
import { isWeekend } from "date-fns";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FAQSection } from "../../components/faq/FAQSection";
import { AvailabilityTable } from "../../components/availability/AvailabilityTable";
import { DateRangePickerDialog } from "../../components/availability/DateRangePickerDialog";
import { AvailabilitiesButtonGroup } from "../../components/availability/AvailabilitiesButtonGroup";
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { ParticipantsAvailabilityTable } from "../../components/availability/ParticipantsAvailabilityTable";
import { currentTripButtonsDataWithGroupId, futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { useParams } from "react-router-dom";
import { doGet } from "../../components/utils/fetch-utils";
import { useEffect } from 'react';
import { parseISO } from "date-fns/esm";


export const URL = '/availability/:groupId';
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

export const AvailabilityPageNew = () => {

    const { groupId } = useParams();
    const sharedAvailabilitiesPageLink = "/availability/optimizedDates/" + groupId;
    const [availabilities, setAvailabilites] = useState([])
    const [expanded, setExpanded] = useState(false);
    const [dateRangePickerDialogOpen, setDateRangePickerDialogOpen] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addAvailabilityAction = () => {
        setDateRangePickerDialogOpen(true);
    };

    const getAvailabilities = async () => {
        await doGet('/api/v1/availability/user?' + new URLSearchParams({ userId: sessionStorage.getItem("userId"), groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setAvailabilites(response.map(availability => ({
                    availabilityId: availability.availabilityId, userId: availability.userId, groupId: availability.groupId,
                    startDate: parseISO(availability.dateFrom), endDate: parseISO(availability.dateTo), disabled: true
                })));
            })
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getAvailabilities();
        window.scrollTo(0, 0);
    }, []);


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

    const restrictedDays = availabilities.flatMap(availability =>
        eachDayOfInterval({ start: availability.startDate, end: availability.endDate })
    );

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100vh'
        }}>
            <DateRangePickerDialog open={dateRangePickerDialogOpen}
                onClose={() => setDateRangePickerDialogOpen(false)}
                initialRange={[{ startDate: null, endDate: null, key: "selection" }]}
                restrictedDays={restrictedDays}
                groupId={groupId}
                rangeChange={() => { }}
                onSuccess={() => getAvailabilities()}
                shared={false}
            />
            <NavigationNavbar
                buttonsData={futureTripButtonsDataWithGroupId(groupId)}
                groupId={groupId}
            />
            <Box sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                minWidth: "1000px",
                pb: "30vh"
            }}
            >
                <AvailabilitiesButtonGroup groupId={groupId} clickedButton={"myAv"} />
                <Divider sx={{ width: "100%", mb: 3 }} />
                <Card
                    sx={{
                        m: 4,
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
                            <EventAvailableIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                            <Box sx={{ minWidth: "250px" }}>
                                <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                    My availability
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                width: "100%"
                            }}>
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
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
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
                            <AvailabilityTable
                                availabilities={availabilities}
                                groupId={groupId}
                                onSuccess={() => getAvailabilities()}
                            />
                        </CardContent>
                    </Collapse>
                </Card >
                <Box
                    sx={{
                        minWidth: "1050px",
                        borderRadius: "10px",
                    }}
                >
                    <Box
                        sx={{
                            pt: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minWidth: "90%",
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "center",
                            alignItems: 'center',
                            width: "100%",
                            height: "40px",
                            mb: "50px",
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: "100%"
                            }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        width: "90%"
                                    }}
                                >
                                    Other participants availability
                                </Typography>
                            </Box>
                        </Box>
                        <ParticipantsAvailabilityTable groupId={groupId} />
                    </Box>
                </Box>
            </Box>
            <FAQSection />
        </Box>
    );
};