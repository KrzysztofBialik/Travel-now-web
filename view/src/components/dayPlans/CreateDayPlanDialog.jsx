import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import ChurchIcon from '@mui/icons-material/Church';
import CastleIcon from '@mui/icons-material/Castle';
import SailingIcon from '@mui/icons-material/Sailing';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import { ErrorToast } from '../toasts/ErrorToast';
import { SuccessToast } from '../toasts/SuccessToast';
import isValid from 'date-fns/isValid';
import isBefore from 'date-fns/isBefore';
import { doPost } from "../../components/utils/fetch-utils";


const icons = [
    {
        id: 0,
        value: 0,
        icon: <ChurchIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 1,
        value: 1,
        icon: <DirectionsWalkIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 2,
        value: 2,
        icon: <LocationCityIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 3,
        value: 3,
        icon: <LandscapeIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 4,
        value: 4,
        icon: <RestaurantIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 5,
        value: 5,
        icon: <CastleIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 6,
        value: 6,
        icon: <SailingIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 7,
        value: 7,
        icon: <WaterIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 8,
        value: 8,
        icon: <DownhillSkiingIcon sx={{ color: "primary.main" }} />
    },
];

export const CreateDayPlanDialog = ({ open, onClose, onSuccess }) => {

    const today = new Date();

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const [isCreating, setIsCreating] = useState(false);
    const [dayPlanName, setDayPlanName] = useState({ value: "", length: 0 });
    const [dayPlanNameError, setDayPlanNameError] = useState("You have to provide day plan name.");
    const [creationError, setCreationError] = useState("Ups! Something went wrong. Try again.");

    const [date, setDate] = useState(null);
    const [dateError, setDateError] = useState("You have to provide date.")

    const defaultInputValues = {
        dayPlanName: dayPlanName,
        date: today,
        icon: '0',
    };

    const [values, setValues] = useState(defaultInputValues);

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const onDayPlanNameChange = (value) => {
        setDayPlanNameError(
            value.length === 0 ? "You have to provide day plan name." : null
        )
        setDayPlanName({ value: value, length: value.length });
        console.log(date);
        console.log(dateError);
    };

    const onDateChange = (value) => {
        console.log(value)
        if (!isValid(value)) {
            setDateError("You have to provide valid date.");
            setDate(null);
            return;
        }

        setDateError(
            // isValid(value) ? "You have to provide valid date." : null
            // value === null ? "You have to provide date." : null
            isBefore(value, today) ? "Date cannot be earlier than current day." : null
        )
        setDate(value);
    };

    const validationSchema = Yup.object().shape({
        dayPlanName: Yup
            .string()
            .required(),
        date: Yup
            .date()
            .required()
            .typeError("Invalid date.")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleChange = (value) => {
        setValues(value);
        console.log(values);
    };

    const handleCreateDayPlan = async (dayPlanName, date, icon) => {
        setIsCreating(true);
        var postBody = { 'groupId': localStorage.getItem('groupId'), 'name': dayPlanName, 'date': date, 'iconType': icon };
        await doPost('/api/v1/day-plan', postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                close();
                onSuccess();
            })
            .catch(err => {
                setIsCreating(false);
                setErrorToastOpen(true);
                setCreationError(err.message)
            });
    };

    const close = () => {
        reset();
        setDayPlanName({ value: "", length: 0 });
        setDayPlanNameError("You have to provide day plan name.");
        setDate(today);
        setDateError("You have to provide a date.");
        setValues(defaultInputValues);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Day plan created." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} />

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        minWidth: "400px",
                        maxWidth: "400px",
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
                    <Typography sx={{ color: "#FFFFFF", fontSize: "24px" }}>
                        Create new day plan
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={onClose}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                {/* <DialogTitle variant="h4" 
                sx={{
                     color: "#FFFFFF",
                      backgroundColor: "primary.main" 
                      }}
                      >
                        Create new day plan
                        </DialogTitle> */}
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(() => handleCreateDayPlan(dayPlanName.value, values.date, values.icon))}
                    >
                        <TextField
                            type='string'
                            autoFocus
                            margin="normal"
                            placeholder='Day plan name'
                            name='day plan name'
                            label='Day plan name'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('dayPlanName')}
                            error={Boolean(errors.dayPlanName) ? (Boolean(dayPlanNameError)) : false}
                            helperText={Boolean(errors.dayPlanName) && dayPlanNameError}
                            value={dayPlanName.value}
                            onChange={(event) =>
                                // handleChange({ ...values, dayPlanName: event.target.value });
                                onDayPlanNameChange(event.target.value)
                            }
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", minWidth: "200px", width: "200px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    onChange={(newDate) => {
                                        handleChange({ ...values, date: newDate });
                                        // onDateChange(newDate)
                                    }}
                                    value={values.date}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            sx={{
                                                svg: { color: "#2ab7ca" },
                                                mb: "24px"
                                            }}
                                            onKeyDown={onKeyDown}
                                            label="Date"
                                            type="date"
                                            margin="normal"
                                            value={values.date}
                                            {...register('date')}
                                            error={Boolean(errors.date) ? (Boolean(dateError)) : false}
                                            helperText={Boolean(errors.date) && dateError}
                                            onChange={(event) => {
                                                handleChange({ ...values, date: event.target.value });
                                                // onDateChange(newDate)
                                            }}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                        </Box>
                        <DialogContentText variant="body1" sx={{ my: "-10px" }}>
                            Icon:
                        </DialogContentText>
                        <Box>
                            <TextField
                                sx={{ minWidth: "52px", width: "52px" }}
                                select
                                margin="normal"
                                name='icon'
                                variant="outlined"
                                SelectProps={{
                                    IconComponent: () => null,
                                    autoWidth: true
                                }}
                                {...register('icon')}
                                error={errors.icon ? true : false}
                                helperText={errors.icon?.message}
                                value={values.icon || ""}
                                onChange={(event) => { handleChange({ ...values, icon: event.target.value }) }}
                            >
                                {icons.map((icon) => (
                                    <MenuItem key={icon.id} value={icon.value} sx={{ px: 2, py: 1 }} >
                                        <Box sx={{ px: 0 }}>
                                            {icon.icon}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <DialogActions>
                            {isCreating ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", width: "120px" }}
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
                                        sx={{ borderRadius: "20px", color: "#FFFFFF", width: "120px" }}
                                    >
                                        Create
                                    </Button>
                                </>
                            }
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog >
        </div >
    );
};