import { useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Icon } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { CardContent } from '@mui/material';
import { Collapse } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { OtherParticipantsAvailabilityTable } from "./OtherParticipantsAvailabilityTable";


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


export const ParticipantsAvailabilityDialog = ({ open, onClose, usersAvailability, user }) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose = () => {
        setExpanded(false);
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"lg"}
                PaperProps={{
                    style: {
                        borderRadius: "20px"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFFFFF"
                    }}
                >
                    <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                        {user}'s availability
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <Box sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        minWidth: "1000px"
                    }}
                    >
                        <Card
                            sx={{
                                height: "100%", width: "80%", minWidth: "1000px"
                            }}
                            elevation={0}
                        >
                            <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    m: "20px"
                                }}>
                                    <DateRange
                                        ranges={usersAvailability}
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
                                        showMonthAndYearPickers={true}
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
                                    <OtherParticipantsAvailabilityTable availabilities={usersAvailability} />
                                </CardContent>
                            </Collapse>
                        </Card >
                    </Box >
                </Box >
            </Dialog >
        </>
    );
};