import * as React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { MenuItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogTitle } from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';
import { TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import { UpdatedTripConfirmationDialog } from './UpdatedTripConfirmationDialog';
import { ErrorTripConfirmationDialog } from './ErrorTripConfirmationDialog';
import { doGet } from "../../components/utils/fetch-utils";
import { doPatch } from "../../components/utils/fetch-utils";
import { useEffect } from 'react';
import Rule from '@mui/icons-material/Rule';

const currencies = [
    {
        id: 1,
        value: 'USD',
        label: 'USD',
    },
    {
        id: 2,
        value: 'EUR',
        label: 'EUR',
    },
    {
        id: 3,
        value: 'PLN',
        label: 'PLN',
    },
    {
        id: 4,
        value: 'CZK',
        label: 'CZK',
    },
    {
        id: 5,
        value: 'GBP',
        label: 'GBP',
    },
    {
        id: 6,
        value: 'HRK',
        label: 'HRK',
    },
    {
        id: 7,
        value: 'UAH',
        label: 'UAH',
    },
    {
        id: 8,
        value: 'JPY',
        label: 'JPY',
    },
];


export const TripGroupOptionsDialog = ({ open, onClose, groupId }) => {

    const [confirmUpdatedDialogOpen, setConfirmUpdateDialogOpen] = useState(false);
    const [confirmErrorDialogOpen, setConfirmErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [tripData, setTripData] = useState({});
    const [groupStage, setGroupStage] = useState([])
    const DESCRIPTION_LIMIT = 250;

    useEffect(() => {
        if (groupId) {
            getTripData();
        }
    }, []);

    const getTripData = async () => {
        setIsLoading(true);
        await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setNecessaryData(response);
            })
            .catch(err => console.log('Request Failed', err));
        setIsLoading(false);
    };

    useEffect(() => {
        reset(tripData);
    }, [tripData])

    const validationSchema = Yup.object().shape({
        tripName: Yup
            .string()
            .required("You have to provide trip name"),
        startingLocation: Yup
            .string()
            .required("You have to provide starting location"),
        currency: Yup
            .string()
            .required("You have to provide currency for trip group"),
        minDays: Yup
            .number()
            .min(1, "Number of days must be equal or higher than 1"),
        minParticipants: Yup
            .number()
            .min(1, "Number of participants must be equal or higher than 1"),
        description: Yup
            .string()
            .max(DESCRIPTION_LIMIT, "You have exceeded characters limit for description")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, watch, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: useMemo(() => {
            return tripData;
        }, [tripData])
    });

    const setNecessaryData = (response) => {
        setDescriptionLength(response.description.length);
        setTripData({
            tripName: response.name, startingLocation: response.startLocation, currency: response.currency, minDays: response.minimalNumberOfDays,
            minParticipants: response.minimalNumberOfParticipants, description: response.description
        })
        setGroupStage(response.groupStage)
    }
    const handleUpdateTrip = () => {
        editUserAccount(getValues());
    };

    const handleSuccess = () => {
        setConfirmUpdateDialogOpen(true);
    }

    const close = () => {
        reset();
        onClose();
    };

    const editUserAccount = async (values) => {
        setIsUpdating(true);
        console.log("hello there")
        console.log(values)
        var postBody = {
            'name': values.tripName, 'currency': values.currency, 'description': values.description, 'startLocation': values.startingLocation,
            'minimalNumberOfDays': values.minDays, 'minimalNumberOfParticipants': values.minParticipants
        };

        await doPatch('/api/v1/trip-group/group?' + new URLSearchParams({ groupId: groupId }).toString(), postBody)
            .then(response => {
                getTripData();
                handleSuccess();
            })
            .catch(err => {
                setConfirmErrorDialogOpen(true);
                setErrorMessage(err.message)
                console.log('Request Failed', err.message)
            });
        setIsUpdating(false);
    }

    const isPlanningStage = (groupStage === "PLANNING_STAGE" ? false : true);

    const descriptionWatch = watch("description");

    return (
        <>
            <UpdatedTripConfirmationDialog
                open={confirmUpdatedDialogOpen}
                onClose={() => setConfirmUpdateDialogOpen(false)}
            />
            <ErrorTripConfirmationDialog
                open={confirmErrorDialogOpen}
                onClose={() => setConfirmErrorDialogOpen(false)}
                message={errorMessage}
            />
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px"
                    }}
                >
                    <Box sx={{ color: "#FFFFFF" }}>
                        Trip group settings
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
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        height: "100%",
                        position: "relative"
                    }}>
                        <Box
                            sx={{
                                width: "100%",
                                minWidth: '600px',
                                minHeight: "570px",
                                my: 10,
                                display: 'flex',
                                overflow: "visible",
                                flexDirection: 'row',
                                justifyContent: "center"
                            }}
                        >
                            <Card
                                sx={{
                                    // marginTop: 10,
                                    overflow: "visible",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    overflowWrap: "break-word",
                                    backgroundClip: "border-box",
                                    width: "100%",
                                    minWidth: '400px',
                                    maxWidth: '600px',
                                    height: "100%",
                                    borderRadius: "10px",
                                }}
                                elevation={2}
                            >
                                <Box
                                    sx={{
                                        mx: 2,
                                        mt: -3,
                                        py: 2,
                                        px: 2,
                                        backgroundColor: "primary.main",
                                        color: "#000000",
                                        borderRadius: "0.5rem",
                                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                        Manage trip group data
                                    </Typography>
                                    <Rule sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    px: '40px',
                                    pb: "20px",
                                    minHeight: "200px"
                                }}>
                                    <Box sx={{ height: "100%", width: "100%" }}>
                                        {isLoading ?
                                            <Box sx={{ minHeight: "485px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <CircularProgress />
                                            </Box>
                                            :
                                            <form
                                                onSubmit={handleSubmit(handleUpdateTrip)}
                                            >
                                                <TextField
                                                    sx={{ mt: "30px" }}
                                                    type='string'
                                                    autoFocus
                                                    margin="normal"
                                                    placeholder='Trip name'
                                                    disabled={isPlanningStage}
                                                    name='trip name'
                                                    label='Trip name'
                                                    defaultValue={tripData.tripName}
                                                    fullWidth
                                                    variant="outlined"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EditIcon sx={{ color: "primary.main" }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('tripName')}
                                                    error={!!errors.tripName}
                                                    helperText={errors.tripName?.message}
                                                />

                                                <TextField
                                                    type='string'
                                                    margin="normal"
                                                    placeholder='Starting location'
                                                    name='startingLocation'
                                                    defaultValue={tripData.startingLocation}
                                                    disabled={isPlanningStage}
                                                    label='Starting location'
                                                    fullWidth
                                                    variant="outlined"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LocationOnIcon sx={{ color: "primary.main" }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('startingLocation')}
                                                    error={!!errors.startingLocation}
                                                    helperText={errors.startingLocation?.message}
                                                />
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }} >
                                                    <Controller
                                                        name='currency'
                                                        control={control}
                                                        render={({ field: { onChange, value } }) => (
                                                            <TextField
                                                                sx={{ minWidth: "150px", width: "150px" }}
                                                                fullWidth
                                                                select
                                                                margin='normal'
                                                                variant='outlined'
                                                                defaultValue={tripData.currency}
                                                                disabled={isPlanningStage}
                                                                label='currency'
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <CurrencyExchangeIcon sx={{ color: "primary.main", mr: "10px" }} />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                value={value}
                                                                onChange={onChange}
                                                                error={!!errors.currency}
                                                                helperText={errors.currency?.message}
                                                            >
                                                                {currencies.map((currency) => (
                                                                    <MenuItem key={currency.label} value={currency.value}>
                                                                        {currency.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>)}
                                                    />
                                                    <TextField
                                                        sx={{ minWidth: "150px", width: "150px" }}
                                                        type="number"
                                                        margin="normal"
                                                        placeholder='Min days'
                                                        name='minDays'
                                                        defaultValue={tripData.minDays}
                                                        disabled={isPlanningStage}
                                                        label='Min days'
                                                        variant="outlined"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AccessTimeIcon sx={{ color: "primary.main" }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        {...register('minDays')}
                                                        error={!!errors.minDays}
                                                        helperText={errors.minDays?.message}
                                                    />
                                                    <TextField
                                                        sx={{ minWidth: "150px", width: "150px" }}
                                                        type="number"
                                                        margin="normal"
                                                        placeholder='Min participants'
                                                        name='minParticipants'
                                                        defaultValue={tripData.minParticipants}
                                                        disabled={isPlanningStage}
                                                        label='Min participants'
                                                        variant="outlined"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PeopleAltOutlinedIcon sx={{ color: "primary.main" }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        {...register('minParticipants')}
                                                        error={!!errors.minParticipants}
                                                        helperText={errors.minParticipants?.message}
                                                    />
                                                </Box>
                                                <TextField
                                                    type='string'
                                                    margin="normal"
                                                    multiline
                                                    rows={4}
                                                    placeholder='Description'
                                                    name='description'
                                                    label='Description'
                                                    defaultValue={tripData.description}
                                                    disabled={isPlanningStage}
                                                    fullWidth
                                                    variant="outlined"
                                                    {...register('description')}
                                                    error={!!errors.description}
                                                />
                                                <FormHelperText
                                                    error={!!errors.description}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        padding: "0 10px",
                                                        pb: "10px"
                                                    }}
                                                >
                                                    <span>{errors.description?.message}</span>
                                                    <span>{descriptionWatch ? descriptionWatch.length : 0}/{DESCRIPTION_LIMIT}</span>
                                                </FormHelperText>
                                                {!isPlanningStage ?
                                                    <DialogActions>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{ borderRadius: "20px", color: "#FFFFFF", width: "140px" }}
                                                        >
                                                            {isUpdating ?
                                                                <CircularProgress size="24px" sx={{ color: "#FFFFFF" }} />
                                                                :
                                                                "Update data"
                                                            }
                                                        </Button>
                                                    </DialogActions>
                                                    :
                                                    <Box></Box>
                                                }
                                            </form>
                                        }
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box >
                </DialogContent>
            </Dialog >
        </ >
    );
};