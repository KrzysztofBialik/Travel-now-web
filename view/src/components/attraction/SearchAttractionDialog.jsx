import * as React from 'react';
import { useState } from "react";
import { styled, alpha, ButtonBase } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { FormControl } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ErrorToast } from '../toasts/ErrorToast';
import { AttractionCard } from './AttractionCard';
import { AttractionCandidateCard } from './AttractionCandidateCard';
import { SelectAttractionDialog } from './SelectAttractionDialog';
import { doGet } from "../../components/utils/fetch-utils";
import { CircularProgress } from "@mui/material";

export const SearchAttractionDialog = ({ open, onClose, dayPlanId, onSuccess }) => {

    const [selectAttractionDialogOpen, setSelectAttractionDialogOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    // const [candidateData, setCandidateData] = useState("");
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedAttractionData, setSelectedAttractionData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearchValue(event.target.value)
        console.log(searchValue);
    };

    const clearInput = () => {
        setCandidates([]);
        setSearchValue("");
        setShowClearIcon("none");
    };

    const searchAction = (value) => {
        if (value === "") {
            setErrorToastOpen(true);
            return;
        }
        ///wyszukiwanie na podstawie value
        handleSearch(value);
        setSearchResult(value);
        setShowClearIcon("none");
    };

    const handleSearch = async (attractionName) => {
        setLoading(true)
        doGet('/api/v1/attraction/find?' + new URLSearchParams({ name: attractionName }).toString())
        .then(response => response.json())  // convert to json
        .then(json => {setCandidates(json); setLoading(false)})
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
        onClose();
    }

    // const handleEditAttraction = (name, description) => {
    //     // editAccommodation(price, description);
    //     // setSuccessToastOpen(true);
    //     // // setTripName('');
    //     // // setStartingLocation('');
    //     // // setCurrency("PLN");
    //     // // setDescription('');
    //     close();
    // }

    // const close = () => {
    //     reset();
    //     setValues(defaultInputValues);
    //     setDescription({ value: attractionData.description, length: descriptionLength });
    //     setSuccessToastOpen(true);
    //     onClose();
    // }

    // const handleErrorClose = () => {
    //     setDescription({ value: attractionData.description, length: descriptionLength });
    //     setErrorToastOpen(true);
    //     onClose();
    // };

    return (
        <div>
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Unable to search for no attraction!" />
            <SelectAttractionDialog
                open={selectAttractionDialogOpen}
                onClose={() => setSelectAttractionDialogOpen(false)}
                attractionData={selectedAttractionData}
                closeWithSelect={closeWithSelect}
                dayPlanId={dayPlanId}
                onSuccess={(id) => onSuccess(id)}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        height: "75%",
                        minHeight: "500px",
                        width: "70%",
                        maxWidth: "700px"
                        // minWidth: "700px"
                    }
                }}
                sx={{ overflow: "hidden" }}
            >
                <DialogTitle
                    variant="h4"
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "#FFFFFF"
                    }}
                >
                    <Box sx={{ color: "#FFFFFF" }}>
                        Search attractions
                    </Box>
                    <Button variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            backgroundColor: "secondary.main",
                            color: "#000000",
                            "&:hover": {
                                backgroundColor: "secondary.dark"
                            }
                        }}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            onChange={(event) => handleChange(event)}
                            value={searchValue}
                            placeholder={"Museum in Barcelona..."}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            sx={{ ml: -1 }}
                                            onClick={() => searchAction(searchValue)}
                                        >
                                            <SearchIcon sx={{ color: "primary.main" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{
                                            display: searchValue === "" ? "none" : "flex"
                                        }}
                                    >
                                        <IconButton onClick={() => clearInput()}>
                                            <ClearIcon sx={{ color: "primary.main" }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Prevent's default 'Enter' behavior.
                                    // event.defaultMuiPrevented = true;
                                    // your handler code
                                    searchAction(searchValue);
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "20px", color: "#FFFFFF" }}
                            onClick={() => searchAction(searchValue)}
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
                                // border: "2px solid black"
                            }}
                        >  
                            <CircularProgress />
                        </Box>
                        :
                        candidates.length === 0 ? 
                            <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Typography variant="h5">Search attractions and add them to day plan</Typography>
                            </Box>
                            :
                            <Box>
                                <Typography variant="h5" sx={{ my: 3 }}>Search results for {`"${searchResult}"`}</Typography>
                                <List sx={{ px: 0, minWidth: "80%", overflow: "auto" }}>
                                    {candidates.map(candidate =>
                                        <ListItem sx={{ p: 0, px: "2px", mb: 3, width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} key={candidate.placeId}>
                                            <AttractionCandidateCard attractionData={candidate} openSelectAttractionDialog={() => handleSelectAction(candidate)} />
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                    }
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                </DialogContent>
            </Dialog>
        </div >
    );
};