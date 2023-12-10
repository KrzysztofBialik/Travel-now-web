import { useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Icon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import { CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateRange } from 'react-date-range';
import isWeekend from "date-fns/isWeekend";
import format from "date-fns/format";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { OptimizedDatesTable } from "../../components/availability/OptimizedDatesTable";
import { AvailabilitiesButtonGroup } from "../../components/availability/AvailabilitiesButtonGroup";
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { currentTripButtonsDataWithGroupId, futureTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { doGet } from "../../components/utils/fetch-utils";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { parseISO } from "date-fns/esm";


export const URL = '/availability/OptimizedDates/:groupId';
export const NAME = "OptimizedDates";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Icon {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export const OptimizedDatesPageNew = () => {
    const { groupId } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [optimizedDates, setOptimizedDates] = useState([]);
    const myAvailabilitiesPageLink = "/availability/" + groupId;
    const [selectedSharedAvailability, setSelectedSharedAvailability] = useState([]);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const optimizeDates = async () => {
        await doGet('/api/v1/availability/triggerAvailabilityGeneration?' + new URLSearchParams({ groupId: groupId }).toString())
            .catch(err => console.log('Request Failed', err));
        console.log("Im here")
        window.location.reload();
    }


    const getOptimizedDates = async () => {
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => setSelectedSharedAvailability(response.selectedSharedAvailability))
            .catch(err => console.log('Request Failed', err));

        await doGet('/api/v1/shared-availability/list?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setOptimizedDates(response.map(optimizedAvailability => ({
                    sharedGroupAvailability: optimizedAvailability.sharedGroupAvailabilityId, startDate: parseISO(optimizedAvailability.dateFrom),
                    endDate: parseISO(optimizedAvailability.dateTo), days: optimizedAvailability.numberOfDays, participants: optimizedAvailability.usersList.length
                })));
            })
            .catch(err => console.log('Request Failed', err));

    }

    useEffect(() => {
        getOptimizedDates();
    }, [])


    function customDayContent(day) {
        var fontWeight = 100;
        var color = "#000000";
        if (isWeekend(day)) {
            fontWeight = 700;
            color = "#2ab7ca"
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
            <NavigationNavbar
                buttonsData={futureTripButtonsDataWithGroupId(groupId)}
                groupId={groupId}
            />
            <Box sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                minWidth: "1000px"
            }}
            >
                <AvailabilitiesButtonGroup groupId={groupId} clickedButton={"optimized"} />
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
                            backgroundColor: "secondary.main",
                            color: "#000000",
                            borderRadius: "0.5rem",
                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                            <TipsAndUpdatesOutlinedIcon sx={{ fontSize: "32px" }} />
                            <Box sx={{ minWidth: "250px" }}>
                                <Typography sx={{ fontSize: "32px" }}>
                                    Optimized dates
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "flex-end"
                            }}>
                                <Box>
                                    <Button variant="contained"
                                        sx={{
                                            backgroundColor: "primary.main",
                                            color: "#FFFFFF",
                                            borderRadius: "20px",
                                            mr: "20px"
                                        }}
                                        onClick={optimizeDates}
                                    >
                                        Optimize dates
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
                                ranges={optimizedDates}
                                onChange={null}
                                months={3}
                                weekStartsOn={1}
                                shownDate={new Date()}
                                direction="horizontal"
                                rangeColors={["#ffc928"]}
                                color={"#ffc928"}
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
                                sx={{
                                    backgroundColor: "secondary.main",
                                    color: "#000000",
                                    borderRadius: "20px",
                                    "&:hover": {
                                        backgroundColor: "secondary.dark"
                                    }
                                }}
                                onClick={handleExpandClick}
                            >
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    sx={{ ml: -1 }}
                                >
                                    <ExpandMoreIcon sx={{ color: "#000000" }} />
                                </ExpandMore>
                                Details
                            </Button>
                        </Box>

                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <OptimizedDatesTable
                                optimizedDates={optimizedDates}
                                selectedSharedAvailability={selectedSharedAvailability}
                                onSuccess={() => getOptimizedDates()}
                            />
                        </CardContent>
                    </Collapse>
                </Card >
            </Box>
        </Box>
    );
};