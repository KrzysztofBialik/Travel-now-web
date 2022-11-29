import * as React from 'react';
import { useState } from "react";
import { Box } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import isValid from 'date-fns/isValid';
import isBefore from 'date-fns/isBefore';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import parseISO from 'date-fns/parseISO';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPatch } from "../../components/utils/fetch-utils";


const icons = [
    {
        id: 1,
        value: 1,
        icon: <ChurchIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 2,
        value: 2,
        icon: <CastleIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 3,
        value: 3,
        icon: <SailingIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 4,
        value: 4,
        icon: <LocationCityIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 5,
        value: 5,
        icon: <DirectionsWalkIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 6,
        value: 6,
        icon: <WaterIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 7,
        value: 7,
        icon: <LandscapeIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 8,
        value: 8,
        icon: <RestaurantIcon sx={{ color: "primary.main" }} />
    },
    {
        id: 9,
        value: 9,
        icon: <DownhillSkiingIcon sx={{ color: "primary.main" }} />
    },
];

export const EditDayPlanDialog = ({ open, onClose, dayPlanData, onSuccess }) => {

    const today = new Date();

    // const initialDate = format(new Date(dayPlanData.year, dayPlanData.month, dayPlanData.day), "MM/dd/yyyy");
    const initialDate = format(parseISO(dayPlanData.date), "MM/dd/yyyy");

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const dayPlanNameLength = dayPlanData.name.length;
    const [dayPlanName, setDayPlanName] = useState({ value: dayPlanData.name, length: dayPlanNameLength });
    const [dayPlanNameError, setDayPlanNameError] = useState("You have to provide day plan name.");
    const [editionError, setEditionError] = useState("Ups! Something went wrong. Try again.");

    const [date, setDate] = useState(initialDate);
    const [dateError, setDateError] = useState("You have to provide date.")

    const defaultInputValues = {
        dayPlanName: dayPlanName,
        date: initialDate,
        icon: dayPlanData.iconId,
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
            setDate(initialDate);
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

    const handleEditDayPlan = async (dayPlanName, date, icon) => {
        var postBody = {'groupId':localStorage.getItem('groupId'), 'name':dayPlanName, 'date':format(new Date(Date.parse(date)), "yyyy-MM-dd"), 'iconType':icon};
        await doPatch('/api/v1/day-plan?dayPlanId=' + dayPlanData.dayPlanId, postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                close();
                onSuccess();
            })
            .catch(err => {setErrorToastOpen(true); 
                setEditionError(err.message)
            });
    };

    const close = () => {
        reset();
        setDayPlanName({ value: dayPlanData.name, length: dayPlanNameLength });
        setDayPlanNameError("You have to provide day plan name.");
        setDate(initialDate);
        setDateError("You have to provide a date.");
        setValues(defaultInputValues);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Day plan successfully edited." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={editionError} />

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4">Create new day plan</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(() => handleEditDayPlan(dayPlanName.value, values.date, values.icon))}
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
                            {/* <TextField
                                variant="outlined"
                                type='date'
                                autoFocus
                                placeholder='Date'
                                name='date'
                                label='Date'
                                margin="normal"
                                {...register('date')}
                                error={Boolean(errors.date) ? (Boolean(dateError)) : false}
                                helperText={Boolean(errors.date) && dateError}
                                value={date}
                                onChange={(newDate) => onDateChange(newDate)}
                            /> */}
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
                                sx={{ borderRadius: "20px", color: "#FFFFFF" }}
                            >
                                Edit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog >
        </div >
    );
};