import * as React from 'react';
import { useState } from "react";
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { CreatedTripConfirmationDialog } from './CreatedTripConfirmationDialog';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPost } from '../utils/fetch-utils';


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

export const CreateTripDialog = ({ open, onClose, createTrip, onSuccess }) => {

    const [isCreating, setIsCreating] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [creationError, setCreationError] = useState("Ups! Something went wrong. Try again.");
    const DESCRIPTION_LIMIT = 120;

    const defaultInputValues = {
        tripName: "",
        startingLocation: "",
        currency: "",
        minDays: 0,
        minParticipants: 0,
        description: ""
    };

    const validationSchema = Yup.object().shape({
        tripName: Yup
            .string()
            .required("You have to provide trip name")
            .max(50, "Too long name, max. 50 characters"),
        startingLocation: Yup
            .string()
            .required("You have to provide starting location")
            .max(100, "Too long starting location, max. 100 characters"),
        currency: Yup
            .string()
            .required("You have to provide currency for trip group"),
        minDays: Yup
            .number()
            .min(1, "Number of days must be equal or higher than 1")
            .required("You have to provide min number of days"),
        minParticipants: Yup
            .number()
            .min(1, "Number of participants must be equal or higher than 1")
            .required("You have to provide min number of participants"),
        description: Yup
            .string()
            .max(DESCRIPTION_LIMIT, "You have exceeded characters limit for description")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, watch, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const descriptionWatch = watch("description");

    const close = () => {
        reset();
        onClose();
    };

    const handleCreateTrip = async () => {
        setIsCreating(true);
        var values = getValues();
        var postBody = {
            'name': values.tripName,
            'currency': values.currency,
            'description': values.description,
            'votesLimit': 0,
            'startLocation': values.startingLocation,
            'startCity': values.startingLocation,
            'minimalNumberOfDays': values.minDays,
            'minimalNumberOfParticipants': values.minParticipants
        };
        await doPost('/api/v1/trip-group/group', postBody)
            .then(response => {
                if (response.ok) {
                    setConfirmDialogOpen(true);
                    close();
                }
            })
            .catch(err => {
                setErrorToastOpen(true);
                setCreationError(err.message)
            });
        setIsCreating(false);
    };

    return (
        <div>
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} />
            <CreatedTripConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onSuccess={() => onSuccess()}
            />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        minHeight: "640px",
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
                        color: "#FFFFFF",
                        mb: 2
                    }}
                >
                    <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                        Create new trip
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={close}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText variant="body1" mb="20px">
                        Provide informations about your trip. You can always change them later.
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(handleCreateTrip)}
                    >
                        <TextField
                            type='string'
                            autoFocus
                            margin="normal"
                            placeholder='Trip name'
                            name='trip name'
                            label='Trip name'
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
                                        label='Currency'
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
                                label='Min days'
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 1 },
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
                                label='Min participants'
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 1 },
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
                                pb: "30px"
                            }}
                        >
                            <span>{errors.description?.message}</span>
                            <span>{`${descriptionWatch.length}/${DESCRIPTION_LIMIT}`}</span>
                        </FormHelperText>
                        <DialogActions>
                            {isCreating ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", width: "130px" }}
                                >
                                    <CircularProgress size="24px" sx={{ color: "#FFFFFF" }} />
                                </Button>
                                :
                                <>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderRadius: "20px" }}
                                        onClick={() => close()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ borderRadius: "20px", color: "#FFFFFF", width: "130px" }}
                                    >
                                        Create trip
                                    </Button>
                                </>
                            }
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};