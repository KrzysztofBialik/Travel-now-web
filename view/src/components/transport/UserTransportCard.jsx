import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { ListItemText } from "@mui/material";
import CommuteIcon from '@mui/icons-material/Commute';
import CircleIcon from '@mui/icons-material/Circle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { EditTransportDialog } from "./EditTransportDialog";
import { DeleteTransportDialog } from "./DeleteTransportDialog";
import { format, parseISO } from "date-fns";
import * as durationn from 'duration-fns'
import { doGet } from "../utils/fetch-utils";

export const UserTransportCard = ({ transportData, onSuccess, accommodationId }) => {

    const { groupId } = useParams();
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [currency, setCurrency] = useState("");
    const [editTransportDialogOpen, setEditTransportDialogOpen] = useState(false);
    const [deleteTransportDialogOpen, setDeleteTransportDialogOpen] = useState(false);

    const editAction = () => {
        setEditTransportDialogOpen(true);
    };

    const deleteAction = () => {
        setDeleteTransportDialogOpen(true);
    };

    const parseTime = (duration) => {
        var time = durationn.parse(duration);
        return constructString(time)
    };

    const getCurrency = async () => {
        setCurrencyLoading(true);
        var resp = await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var currency = response.currency;
                setCurrency(currency);
            })
            .then(setCurrencyLoading(false))
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getCurrency();
    }, []);

    const constructString = (time) => {
        var result = "";
        if (time.days !== 0) {
            result = result + time.days + "d "
        }

        if (time.hours !== 0) {
            result = result + time.hours + "h "
        }

        if (time.minutes !== 0) {
            result = result + time.minutes + "m "
        }
        return result;
    };

    return (
        <>
            <EditTransportDialog
                open={editTransportDialogOpen}
                onClose={() => setEditTransportDialogOpen(false)}
                transportData={transportData}
                onSuccess={() => onSuccess()}
            />
            <DeleteTransportDialog
                open={deleteTransportDialogOpen}
                onClose={() => setDeleteTransportDialogOpen(false)}
                transportId={transportData.transportId}
                accommodationId={accommodationId}
            // onSuccess={() => onSuccess()}
            />
            <Card
                sx={{
                    borderRadius: "10px",
                }}
                elevation={3}
            >
                <List>
                    <ListItem>
                        <CommuteIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={transportData.meanOfTransport}
                        />
                    </ListItem>
                    <ListItem>
                        <CircleIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={transportData.source}
                        />
                    </ListItem>
                    <ListItem>
                        <LocationOnIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={transportData.destination}
                        />
                    </ListItem>
                    <ListItem>
                        <AccessTimeIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={parseTime(transportData.duration)}
                        />
                    </ListItem>
                    <ListItem>
                        <CalendarMonthOutlinedIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={format(parseISO(transportData.meetingTime), "dd/mm/yyyy")}
                        />
                    </ListItem>
                    <ListItem sx={{ ml: "10px", mt: "-20px" }}>
                        <SubdirectoryArrowRightOutlinedIcon sx={{ color: "text.secondary" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            secondary={`meeting at ${format(parseISO(transportData.meetingTime), "HH:mm")}`}
                        />
                    </ListItem>
                    <ListItem>
                        <AttachMoneyOutlinedIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={currencyLoading ? <CircularProgress size="20px" sx={{ ml: 2, mt: 1 }} /> : `${transportData.price} ${currency}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            secondary={transportData.description}
                        />
                    </ListItem>
                </List>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            "&:hover": {
                                color: "#FFFFFF",
                                backgroundColor: "primary.main"
                            }
                        }}
                        onClick={editAction}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            "&:hover": {
                                color: "#FFFFFF",
                                backgroundColor: "primary.main"
                            }
                        }}
                        onClick={deleteAction}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};