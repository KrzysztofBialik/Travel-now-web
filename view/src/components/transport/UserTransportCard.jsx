import { useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
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
import { format } from "date-fns";

export const UserTransportCard = ({ transportData }) => {

    const [editTransportDialogOpen, setEditTransportDialogOpen] = useState(false);
    const [deleteTransportDialogOpen, setDeleteTransportDialogOpen] = useState(false);

    const editAction = () => {
        setEditTransportDialogOpen(true);
    };

    const deleteAction = () => {
        setDeleteTransportDialogOpen(true);
    };

    return (
        <>
            <EditTransportDialog
                open={editTransportDialogOpen}
                onClose={() => setEditTransportDialogOpen(false)}
                transportData={transportData}
            />
            <DeleteTransportDialog
                open={deleteTransportDialogOpen}
                onClose={() => setDeleteTransportDialogOpen(false)}
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
                            primary={transportData.name}
                        />
                    </ListItem>
                    <ListItem>
                        <CircleIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={transportData.meetingLocation}
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
                            primary={`${transportData.hours}h ${transportData.minutes}m`}
                        />
                    </ListItem>
                    <ListItem>
                        <CalendarMonthOutlinedIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={transportData.meetingDate}
                        />
                    </ListItem>
                    <ListItem sx={{ ml: "10px", mt: "-20px" }}>
                        <SubdirectoryArrowRightOutlinedIcon sx={{ color: "text.secondary" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            secondary={`meeting at ${format(transportData.meetingTime, "HH:mm")}`}
                        />
                    </ListItem>
                    <ListItem>
                        <AttachMoneyOutlinedIcon sx={{ color: "primary.main" }} />
                        <ListItemText
                            sx={{ ml: "10px" }}
                            primary={`${transportData.price} PLN`}
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