import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorToast } from '../toasts/ErrorToast';
import { AttractionCandidateCard } from './AttractionCandidateCard';
import { SelectAttractionDialog } from './SelectAttractionDialog';
import { doGet } from "../../components/utils/fetch-utils";
import { CircularProgress } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const SearchNearbyAttractionDialog = ({ open, onClose, dayPlanId, onSuccess }) => {

    const [selectAttractionDialogOpen, setSelectAttractionDialogOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedAttractionData, setSelectedAttractionData] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({});
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
        });
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value)
    };

    // const clearInput = () => {
    //     setCandidates([]);
    //     setSearchValue("");
    //     setShowClearIcon("none");
    // };

    // const searchAction = ({ category, sortBy }) => {
    //     // if (value === "") {
    //     //     setErrorToastOpen(true);
    //     //     return;
    //     // }
    //     handleSearch({ category, sortBy });
    //     // setSearchResult({ category, sortBy });
    //     // setShowClearIcon("none");
    //     // getLocation();
    //     // console.log(currentLocation);
    // };

    const handleSearch = async (category, sortBy) => {
        setLoading(true);
        console.log("Lat: " + currentLocation.latitude + " Lng: " + currentLocation.longitude + " Category: " + category + " Sort by: " + sortBy);
        doGet('/api/v1/attraction/find-nearby?' + new URLSearchParams({
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude,
            queryCategory: category,
            rankByType: sortBy
        })
            .toString())
            .then(response => response.json())  // convert to json
            .then(json => { setCandidates(json); setLoading(false) })
            .catch(err => console.log('Request Failed', err));
    };

    const handleClose = () => {
        setCandidates([]);
        setSearchValue("");
        onClose();
    };

    const handleSelectAction = (candidate) => {
        setSelectedAttractionData(candidate);
        setSelectAttractionDialogOpen(true);
    };

    const closeWithSelect = () => {
        setSearchValue("");
        onSuccess(dayPlanId);
        onClose();
    };

    return (
        <div>
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Unable to search for no attraction!" />
            <SelectAttractionDialog
                open={selectAttractionDialogOpen}
                onClose={() => setSelectAttractionDialogOpen(false)}
                attractionData={selectedAttractionData}
                closeWithSelect={() => closeWithSelect()}
                dayPlanId={dayPlanId}
                currentLocation={currentLocation}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        height: "100%",
                        minHeight: "500px",
                        width: "70%",
                        maxWidth: "700px",
                        borderRadius: "20px"
                    }
                }}
                sx={{ overflow: "hidden" }}
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
                        Search attractions nearby
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: "300px", gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP
                                            },
                                        }
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem value={'airport'}>Airport</MenuItem>
                                    <MenuItem value={'atm'}>ATM</MenuItem>
                                    <MenuItem value={'bar'}>Bar</MenuItem>
                                    <MenuItem value={'bus_station'}>Bus Station</MenuItem>
                                    <MenuItem value={'cafe'}>Cafe</MenuItem>
                                    <MenuItem value={'church'}>Church</MenuItem>
                                    <MenuItem value={'gas_station'}>Gas Station</MenuItem>
                                    <MenuItem value={'hospital'}>Hospital</MenuItem>
                                    <MenuItem value={'liquor_store'}>Liquor Store</MenuItem>
                                    <MenuItem value={'museum'}>Museum</MenuItem>
                                    <MenuItem value={'night_club'}>Night Club</MenuItem>
                                    <MenuItem value={'parking'}>Parking</MenuItem>
                                    <MenuItem value={'pharmacy'}>Pharmacy</MenuItem>
                                    <MenuItem value={'police'}>Police</MenuItem>
                                    <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                                    <MenuItem value={'shopping_mall'}>Shopping Mall</MenuItem>
                                    <MenuItem value={'stadium'}>Stadium</MenuItem>
                                    <MenuItem value={'subway_station'}>Subway Station</MenuItem>
                                    <MenuItem value={'taxi_stand'}>Taxi Stand</MenuItem>
                                    <MenuItem value={'train_station'}>Train Station</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortBy}
                                    label="Sort by"
                                    onChange={handleSortByChange}
                                >
                                    <MenuItem value={'DISTANCE'}>Distance</MenuItem>
                                    <MenuItem value={'RATING'}>Rating</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "20px", color: "#FFFFFF" }}
                            onClick={() => handleSearch(category, sortBy)}
                        >
                            Search
                        </Button>
                    </Box>
                    {loading ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "90%"
                            }}
                        >
                            <CircularProgress />
                        </Box>
                        :
                        candidates.length === 0 ?
                            <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Typography variant="h5">Search attractions nearby and add them to day plan</Typography>
                            </Box>
                            :
                            <Box>
                                {/* <Typography variant="h5" sx={{ my: 3 }}>Search results for {`"${category}"`} sorted by {`"${sortBy}"`}</Typography> */}
                                <List sx={{ px: 0, minWidth: "80%", overflow: "auto" }}>
                                    {candidates.map(candidate =>
                                        <ListItem sx={{ p: 0, px: "2px", mb: 3, width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} key={candidate.placeId}>
                                            <AttractionCandidateCard attractionData={candidate} openSelectAttractionDialog={() => handleSelectAction(candidate)} />
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                    }
                </DialogContent>
            </Dialog>
        </div >
    );
};