import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { FormHelperText } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import CommuteIcon from '@mui/icons-material/Commute';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import * as durationn from 'duration-fns'
import { doPatch, doGet } from '../utils/fetch-utils';


export const EditTransportDialog = ({ open, onClose, transportData, onSuccess }) => {

    const transportOptionLength = transportData.meanOfTransport.length;
    const meetingLocationLength = transportData.source.length;
    const destinationLength = transportData.destination.length;
    const descriptionLength = transportData.description.length;
    const [currency, setCurrency] = useState("");
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [editionError, setEditionError] = useState("Ups! Something went wrong. Try again.");

    const [transportOption, setTransportOption] = useState({ value: transportData.meanOfTransport, length: transportOptionLength });
    const [transportOptionError, setTransportOptionError] = useState("You have to provide transport option.");

    const [meetingLocation, setMeetingLocation] = useState({ value: transportData.source, length: meetingLocationLength });
    const [meetingLocationError, setMeetingLocationError] = useState("You have to provide meeting location.");

    const [destination, setDestination] = useState({ value: transportData.destination, length: destinationLength });
    const [destinationError, setDestinationError] = useState("You have to provide destination.");

    //ewentualnie podmienić, że domyślna to 1
    const [hours, setHours] = useState(durationn.parse(transportData.duration).hours);
    const [hoursError, setHoursError] = useState("Must be a valid hour(0 - 23).");

    const [minutes, setMinutes] = useState(durationn.parse(transportData.duration).minutes);
    const [minutesError, setMinutesError] = useState("Must be a valid minute(0 - 59).");

    const [meetingDate, setMeetingDate] = useState(transportData.meetingDate);

    const [meetingTime, setMeetingTime] = useState(transportData.meetingTime);

    const [price, setPrice] = useState(transportData.price);
    const [priceError, setPriceError] = useState("You have to provide a price that is not a negative number.");

    const DESCRIPTION_LIMIT = 250;
    const [description, setDescription] = useState({ value: transportData.description, length: descriptionLength });
    const [descriptionError, setDescriptionError] = useState(null);

    const { groupId } = useParams();


    const getCurrency = async () => {
        var resp = await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var currency = response.currency;
                setCurrency(currency);
            })
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getCurrency();
    }, []);

    const defaultInputValues = {
        transportOption,
        meetingLocation,
        destination,
        hours,
        minutes,
        price,
        description
    };

    const [values, setValues] = useState(defaultInputValues);

    const onTransportOptionChange = (value) => {
        setTransportOptionError(
            value.length === 0 ? "You have to provide transport option" : null
        )
        setTransportOptionError(
            value.length > 99 ? "Transport option name too long, max. 100 characters" : null
        )
        setTransportOption({ value: value, length: value.length });
    };

    const onMeetingLocationChange = (value) => {
        setMeetingLocationError(
            value.length === 0 ? "You have to provide meeting location" : null
        )
        setMeetingLocationError(
            value.length > 99 ? "Meeting location too long, max. 100 characters" : null
        )
        setMeetingLocation({ value: value, length: value.length });
    };

    const onDestinationChange = (value) => {
        setDestinationError(
            value.length === 0 ? "You have to provide destination." : null
        )
        setDestination({ value: value, length: value.length });
    };

    const onHoursChange = (value) => {
        setHoursError(
            (value < 0 || value > 23) ? "Must be a valid hour(0 - 23)." : null
        );
        setHours(value);
    };

    const onMinutesChange = (value) => {
        setMinutesError(
            (value < 0 || value > 59) ? "Must be a valid minute(0 - 59)." : null
        );
        setMinutes(value);
    };

    const onPriceChange = (value) => {
        setPriceError(
            value < 0 ? "You have to provide a price that is not a negative number." : null
        );
        setPrice(value);
    };

    const onDescriptionChange = (value) => {
        setDescriptionError(
            value.length > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null
        );
        setDescription({ value: value, length: value.length });
    };

    const validationSchema = Yup.object().shape({
        transportOption: Yup
            .string()
            .required()
            .max(100),
        meetingLocation: Yup
            .string()
            .required()
            .max(100),
        destination: Yup
            .string()
            .required(),
        hours: Yup
            .number()
            .min(0)
            .max(23)
            .required(),
        minutes: Yup
            .number()
            .min(0)
            .max(59)
            .required(),
        price: Yup
            .number()
            .positive(),
        description: Yup
            .string()
            .max(250)
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        // resolver: yupResolver(validationSchema),
    });

    const handleEditTransport = async (tripName, meetingLocation, destination, minDays, hours, minutes, meetingDate, meetingTime, price, description) => {
        var postBody = {
            'duration': durationn.toString({ hours: parseInt(hours), minutes: parseInt(minutes) }),
            'price': price,
            'source': meetingLocation,
            'destination': destination,
            'startDate': meetingDate,
            'endDate': meetingDate,
            'meanOfTransport': tripName,
            'description': description,
            'meetingTime': meetingTime,
            'link': null
        };
        await doPatch('/api/v1/transport/user-transport?' + new URLSearchParams({ transportId: transportData.transportId }).toString(), postBody)
            .then(response => {
                close();
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setEditionError(err.message)
            });
    };

    const close = () => {
        reset();
        console.log("close")
        setSuccessToastOpen(true);
        // setTransportOption({ value: "", length: 0 });
        // setTransportOptionError("You have to provide trip name.");
        // setMeetingLocation({ value: "", length: 0 });
        // setMeetingLocationError("You have to provide starting location.");
        // setDestination({ value: "", length: 0 });
        // setDestinationError("You have to provide destination.");
        // setHours("");
        // setHoursError("Must be a valid hour(0 - 23).");
        // setMinutes("");
        // setMinutesError("Must be a valid minute(0 - 59).");
        // setPrice("");
        // setPriceError("You have to provide a price that is not a negative number.");
        // setMinutesError("Must be a valid minute(0 - 59).");
        // setMeetingDate(null);
        // setMeetingTime(null);
        // setDescription({ value: "", length: 0 });
        // setValues(defaultInputValues);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Transport option successfully edited" />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={editionError} />
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minHeight: "640px",
                        borderRadius: "20px"
                    }
                }}            >
                <DialogTitle sx={{
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
                        Edit transport option
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={close}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(() => handleEditTransport(transportOption.value, meetingLocation.value, destination.value, 0, hours, minutes, meetingDate, meetingTime, price, description.value))}
                    >
                        <TextField
                            sx={{ mt: "25px" }}
                            type='string'
                            autoFocus
                            margin="normal"
                            placeholder='Transport option'
                            name='transport option'
                            label='Transport option'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CommuteIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('transportOption')}
                            error={Boolean(errors.transportOption) ? (Boolean(transportOptionError)) : false}
                            helperText={Boolean(errors.transportOption) && transportOptionError}
                            value={transportOption.value}
                            onChange={(event) => onTransportOptionChange(event.target.value)}
                        />
                        <TextField
                            type='string'
                            margin="normal"
                            placeholder='Meeting location'
                            name='meetingLocation'
                            label='Meeting location'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditLocationAltIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('meetingLocation')}
                            error={Boolean(errors.meetingLocation) ? (Boolean(meetingLocationError)) : false}
                            helperText={Boolean(errors.meetingLocation) && meetingLocationError}
                            value={meetingLocation.value}
                            onChange={(event) => onMeetingLocationChange(event.target.value)}
                        />
                        <TextField
                            type='string'
                            margin="normal"
                            placeholder='Destination'
                            name='destination'
                            label='Destination'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('destination')}
                            error={Boolean(errors.destination) ? (Boolean(destinationError)) : false}
                            helperText={Boolean(errors.destination) && destinationError}
                            value={destination.value}
                            onChange={(event) => onDestinationChange(event.target.value)}
                        />
                        <DialogContentText variant="body1" mt="10px">
                            Duration:
                        </DialogContentText>

                        <Box sx={{ display: "flex", mt: "-10px", mb: "10px" }} >
                            <TextField
                                sx={{ minWidth: "150px", width: "150px", mr: "50px" }}
                                type="number"
                                margin="normal"
                                placeholder='Hours'
                                name='hours'
                                label='Hours'
                                variant="outlined"
                                {...register('hours')}
                                error={Boolean(errors.hours) ? (Boolean(hoursError)) : false}
                                helperText={Boolean(errors.hours) && hoursError}
                                value={hours}
                                onChange={(event) => onHoursChange(event.target.value)}
                            />
                            <TextField
                                sx={{ minWidth: "150px", width: "150px" }}
                                type="number"
                                margin="normal"
                                placeholder='Minutes'
                                name='minutes'
                                label='Minutes'
                                variant="outlined"
                                {...register('minutes')}
                                error={Boolean(errors.minutes) ? (Boolean(minutesError)) : false}
                                helperText={Boolean(errors.minutes) && minutesError}
                                value={minutes}
                                onChange={(event) => onMinutesChange(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", minWidth: "200px", width: "200px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Meeting date"
                                    value={meetingDate}
                                    margin="normal"
                                    onChange={(newDate) => {
                                        setMeetingDate(newDate);
                                    }}
                                    // InputAdornmentProps={{ position: 'start' }}
                                    renderInput={(params) => <TextField  {...params}
                                        sx={{
                                            svg: { color: "#2ab7ca" },
                                            mb: "24px"
                                        }}
                                    />}
                                />
                                <TimePicker
                                    label="Meeting time"
                                    value={meetingTime}
                                    onChange={(newTime) => {
                                        setMeetingTime(newTime);
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{
                                            svg: { color: "#2ab7ca" },
                                        }}
                                    />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mt: "8px" }}>
                            <TextField
                                sx={{ minWidth: "200px", width: "200px" }}
                                type="number"
                                margin="normal"
                                step='any'
                                placeholder='Price'
                                name='price'
                                label='Price'
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon sx={{ color: "primary.main" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {currency}
                                        </InputAdornment>
                                    )
                                }}
                                {...register('price')}
                                error={Boolean(errors.price) ? (Boolean(priceError)) : false}
                                helperText={Boolean(errors.price) && priceError}
                                value={price}
                                onChange={(event) => onPriceChange(event.target.value)}
                            />
                            <FormHelperText sx={{ mt: "-5px", ml: "14px", mb: "0px" }}>
                                Provide an estimated price for a person.
                            </FormHelperText>
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
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: "20px", color: "#FFFFFF", width: "90px" }}
                            >
                                Edit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};