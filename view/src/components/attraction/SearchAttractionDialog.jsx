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


const sampleData = [
    {
        id: 1,
        name: "Sagrada familia",
        address: "C/ de Mallorca, 401, 08013 Barcelona, Hiszpania",
        latitude: 2.1743569898717463,
        longitude: 41.4036502739253,
        description: "Słynny, budowany od lat 80. XIX w. i nadal nieukończony kościół A. Gaudiego, z muzeum i widokiem na miasto.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipOicANzm_sbK0jBX4WnRf-U6UUb_MCfcRzdQbY-=w408-h724-k-no"
    },
    {
        id: 2,
        name: "Casa Milà",
        address: "Passeig de Gràcia, 92, 08008 Barcelona, Hiszpania",
        latitude: 2.1619131267050693,
        longitude: 41.39534022951416,
        description: "Kataloński budynek secesyjny Gaudiego z kamienną fasadą, słynący z centrum wystawowego i koncertów.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipMxnxc4S1Y5uk2ZEwZOG7vNWPbSGwFZsrIGEhyU=w408-h255-k-no"
    },
    {
        id: 3,
        name: "Plaça de Catalunya",
        address: "Plaça de Catalunya, 08002 Barcelona, Hiszpania",
        latitude: 2.1706005332686638,
        longitude: 41.38722026060981,
        description: "Otoczony drzewami plac w centrum, z rzeźbami, kawiarniami i sklepami – popularne miejsce specjalnych wydarzeń",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipORoCY9eDF_1Tgy6dDsXh6mrlYtg_Dk3HzoLwuy=w408-h544-k-no"
    },

    {
        id: 4,
        name: "Park Güell",
        address: "08024 Barcelona, Prowincja Barcelona, Hiszpania",
        latitude: 2.1528983457448176,
        longitude: 41.414683860535185,
        description: "Pokryte mozaiką budynki, schody i rzeźby w zielonym parku z muzeum Gaudiego i rozległym widokiem.",
        imageLink: "https://lh5.googleusercontent.com/p/AF1QipNgwQHFyIjmdNz9RYHLND4_2hXzrBmqObHjBIfR=w408-h305-k-no"
    }
];

export const SearchAttractionDialog = ({ open, onClose }) => {

    const [selectAttractionDialogOpen, setSelectAttractionDialogOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    // const [candidateData, setCandidateData] = useState("");
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedAttractionData, setSelectedAttractionData] = useState({});

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
        setCandidates(sampleData);
        setSearchResult(value);
        setShowClearIcon("none");
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
                    {candidates.length === 0 ?
                        <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h5">Search attractions and add them to day plan</Typography>
                        </Box>
                        :
                        <Box>
                            <Typography variant="h5" sx={{ my: 3 }}>Search results for {`"${searchResult}"`}</Typography>
                            <List sx={{ px: 0, minWidth: "80%", overflow: "auto" }}>
                                {candidates.map(candidate =>
                                    <ListItem sx={{ p: 0, px: "2px", mb: 3, width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} key={candidate.id}>
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