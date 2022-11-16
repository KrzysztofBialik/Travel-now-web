import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { CreatedTripConfirmationDialog } from './CreatedTripConfirmationDialog';

const currencies = [
    {
        id: 1,
        value: 'USD',
        label: '$',
    },
    {
        id: 2,
        value: 'EUR',
        label: '€',
    },
    {
        id: 3,
        value: 'PLN',
        label: 'zł',
    },
    {
        id: 4,
        value: 'JPY',
        label: '¥',
    },
];

export const CreateTripDialog = ({ open, onClose, createTrip }) => {

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    // const [tripName, setTripName] = useState('');
    // const [startingLocation, setStartingLocation] = useState('');
    // const [currency, setCurrency] = useState('PLN');
    // const [description, setDescription] = useState('');
    const [tripName, setTripName] = useState({ value: "", length: 0 });
    const [tripNameError, setTripNameError] = useState("You have to provide trip name");

    const [startingLocation, setStartingLocation] = useState({ value: "", length: 0 });
    const [startingLocationError, setStartingLocationError] = useState("You have to provide starting location.");

    //ewentualnie podmienić, że domyślna to 1
    const [minDays, setMinDays] = useState("0");
    const [minDaysError, setMinDaysError] = useState("Number of days must be equal or higher than 1.");

    const [minParticipants, setMinParticipants] = useState("0");
    const [minParticipantsError, setMinParticipantsError] = useState("Number of participants must be equal or higher than 1.");

    const DESCRIPTION_LIMIT = 250;
    const [description, setDescription] = useState({ value: "", length: 0 });
    const [descriptionError, setDescriptionError] = useState(null);

    const defaultInputValues = {
        tripName,
        startingLocation,
        currency: 'PLN',
        minDays,
        minParticipants,
        description
    };

    const [values, setValues] = useState(defaultInputValues);

    const onTripNameChange = (value) => {
        setTripNameError(
            value.length === 0 ? "You have to provide trip name." : null
        )
        setTripName({ value: value, length: value.length });
    };

    const onStartingLocationChange = (value) => {
        setStartingLocationError(
            value.length === 0 ? "You have to provide starting location." : null
        )
        setStartingLocation({ value: value, length: value.length });
    };

    const onMinDaysChange = (value) => {
        setMinDaysError(
            value <= 0 ? "Number of days must be equal or higher than 1." : null
        );
        setMinDays(value);
    };

    const onMinParticipantsChange = (value) => {
        setMinParticipantsError(
            value <= 0 ? "Number of participants must be equal or higher than 1." : null
        );
        setMinParticipants(value);
    };

    const onDescriptionChange = (value) => {
        setDescriptionError(
            value.length > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null
        );
        setDescription({ value: value, length: value.length });
    };

    const validationSchema = Yup.object().shape({
        tripName: Yup
            .string()
            .required(),
        startingLocation: Yup
            .string()
            .required(),
        minDays: Yup
            .number()
            .min(1),
        // .required("You have to provide min number of days."),
        minParticipants: Yup
            .number()
            .min(1),
        // .required("You have to provie min number of participants."),
        description: Yup
            .string()
            .max(250)
    });

    // useEffect(() => {
    //     setValues(defaultInputValues);
    // }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleChange = (value) => {
        setValues(value);
        console.log(values);
    };

    const handleCreateTrip = (tripName, startingLocation, currency, minDays, minParticipants, description) => {
        createTrip(tripName, startingLocation, currency, minDays, minParticipants, description);
        // setTripName('');
        // setStartingLocation('');
        // setCurrency("PLN");
        // setDescription('');
        close();
        setConfirmDialogOpen(true);
    }

    const close = () => {
        reset();
        setTripName({ value: "", length: 0 });
        setTripNameError("You have to provide trip name.");
        setStartingLocation({ value: "", length: 0 });
        setStartingLocationError("You have to provide starting location.");
        setMinDays("0");
        setMinDaysError("Number of days must be equal or higher than 1.");
        setMinParticipants("0");
        setMinParticipantsError("Number of participants must be equal or higher than 1.");
        setDescription({ value: "", length: 0 });
        setValues(defaultInputValues);
        onClose();
    }

    return (
        <div>
            <CreatedTripConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
            />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4">Create new trip</DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1" mb="30px">
                        Provide informations about your trip. You can always change them later.
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(() => handleCreateTrip(tripName.value, startingLocation.value, values.currency, minDays, minParticipants, description.value))}
                    >
                        {/* <TextField
                            type='string'
                            autoFocus
                            margin="normal"
                            placeholder='Trip name'
                            name='tripName'
                            label='Trip name'
                            fullWidth
                            variant="outlined"
                            {...register('tripName')}
                            error={errors.tripName ? true : false}
                            helperText={errors.tripName?.message}
                            onChange={(event) => {
                                handleChange({ ...values, tripName: event.target.value });
                            }}
                            value={values.tripName || ""}
                        // value={tripName || ""}
                        // onChange={(event) => setTripName(event.target.value)}
                        /> */}
                        {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AbcIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="With sx" variant="standard" />
                        </Box> */}
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
                            error={Boolean(errors.tripName) ? (Boolean(tripNameError)) : false}
                            helperText={Boolean(errors.tripName) && tripNameError}
                            value={tripName.value}
                            onChange={(event) => onTripNameChange(event.target.value)}
                        />
                        {/* <FormHelperText
                            error={Boolean(errors.tripName) ? (Boolean(tripNameError)) : false}
                        >
                            <span>{Boolean(errors.tripName) && tripNameError}</span>
                        </FormHelperText> */}

                        <TextField
                            type='string'
                            autoFocus
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
                            error={Boolean(errors.startingLocation) ? (Boolean(startingLocationError)) : false}
                            helperText={Boolean(errors.startingLocation) && startingLocationError}
                            value={startingLocation.value}
                            onChange={(event) => onStartingLocationChange(event.target.value)}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }} >
                            <TextField
                                sx={{ minWidth: "100px", width: "100px" }}
                                select
                                margin="normal"
                                name='currency'
                                label='Currency'
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyExchangeIcon sx={{ color: "primary.main", mr: "10px" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('currency')}
                                error={errors.currency ? true : false}
                                helperText={errors.currency?.message}
                                value={values.currency || ""}
                                onChange={(event) => handleChange({ ...values, currency: event.target.value })}
                            >
                                {currencies.map((currency) => (
                                    <MenuItem key={currency.label} value={currency.value}>
                                        {currency.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                sx={{ minWidth: "150px", width: "150px" }}
                                type="number"
                                autoFocus
                                margin="normal"
                                placeholder='Min days'
                                name='minDays'
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
                                error={Boolean(errors.minDays) ? (Boolean(minDaysError)) : false}
                                helperText={Boolean(errors.minDays) && minDaysError}
                                value={minDays}
                                onChange={(event) => onMinDaysChange(event.target.value)}
                            />
                            <TextField
                                sx={{ minWidth: "200px", width: "200px" }}
                                type="number"
                                autoFocus
                                margin="normal"
                                placeholder='Min participants'
                                name='minParticipants'
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
                                error={Boolean(errors.minParticipants) ? (Boolean(minParticipantsError)) : false}
                                helperText={Boolean(errors.minParticipants) && minParticipantsError}
                                value={minParticipants}
                                onChange={(event) => onMinParticipantsChange(event.target.value)}
                            />
                        </Box>

                        <TextField
                            type='string'
                            autoFocus
                            margin="normal"
                            multiline
                            rows={4}
                            placeholder='Description'
                            name='description'
                            label='Description'
                            fullWidth
                            variant="outlined"
                            {...register('description')}
                            error={Boolean(descriptionError)}
                            value={description.value}
                            onChange={(event) => onDescriptionChange(event.target.value)}
                        />
                        <FormHelperText
                            error={Boolean(descriptionError)}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 10px",
                                pb: "30px"
                            }}
                        >
                            <span>{descriptionError}</span>
                            <span>{`${description.length}/${DESCRIPTION_LIMIT}`}</span>
                        </FormHelperText>

                        <DialogActions>
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
                                color="primary"
                                sx={{ borderRadius: "20px" }}
                            >
                                Create trip
                            </Button>
                            {/* <Button
                                type="button"
                                onClick={() => {
                                    trigger();
                                }}
                            >
                                Trigger All
                            </Button> */}
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};