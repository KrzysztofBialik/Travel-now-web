import { useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Icon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { CardHeader } from '@mui/material';
import { CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { OptimizedDatesTable } from "../../components/availability/OptimizedDatesTable";
import { NavigationNavbar } from '../../components/navbars/navigationNavbar/NavigationNavbar';
import { futureTripButtonsData } from '../../components/navbars/navigationNavbar/NavbarNavigationData';


export const URL = '/availability/OptimizedDates';
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

export const optimizedDates = [
    {
        id: 1,
        startDate: new Date(2022, 10, 21),
        endDate: new Date(2022, 10, 25),
        days: 5,
        participants: 6,
        disabled: true
    },
    {
        id: 2,
        startDate: new Date(2022, 11, 5),
        endDate: new Date(2022, 11, 11),
        days: 7,
        participants: 5,
        disabled: true
    },
    {
        id: 3,
        startDate: new Date(2022, 11, 27),
        endDate: new Date(2022, 11, 30),
        days: 4,
        participants: 7,
        disabled: true
    },
];


export const OptimizedDatesPage = () => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const optimizeDates = () => {
        // get data
    }


    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100%'
        }}>
            <NavigationNavbar buttonsData={futureTripButtonsData} />
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
                            backgroundColor: "secondary.main",
                            color: "#000000",
                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125"
                        }}
                        avatar={
                            <TipsAndUpdatesOutlinedIcon />
                        }
                        title="Optimized dates"
                        titleTypographyProps={{ variant: 'h5' }}
                        action={
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
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
                            <OptimizedDatesTable optimizedDates={optimizedDates} />
                        </CardContent>
                    </Collapse>
                </Card >
            </Box>
        </Box>
    );
};