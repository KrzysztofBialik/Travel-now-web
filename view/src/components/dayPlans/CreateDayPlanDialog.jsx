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
import { FormHelperText } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChurchIcon from '@mui/icons-material/Church';
import CastleIcon from '@mui/icons-material/Castle';
import SailingIcon from '@mui/icons-material/Sailing';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';


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

export const CreateDayPlanDialog = ({ open, onClose, createTrip }) => {

    const [dayPlanName, setDayPlanName] = useState({ value: "", length: 0 });
    const [dayPlanNameError, setDayPlanNameError] = useState("You have to provide day plan name.");

    const [meetingDate, setMeetingDate] = useState(null);

    const defaultInputValues = {
        dayPlanName,
        icon: 1,
    };

    const [values, setValues] = useState(defaultInputValues);

    const onDayPlanNameChange = (value) => {
        setDayPlanNameError(
            value.length === 0 ? "You have to provide day plan name." : null
        )
        setDayPlanName({ value: value, length: value.length });
    };

    const validationSchema = Yup.object().shape({
        dayPlanName: Yup
            .string()
            .required()
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleChange = (value) => {
        setValues(value);
        console.log(values);
    };

    const handleCreateTrip = (dayPlanName) => {
        createTrip(dayPlanName);
        // setTripName('');
        // setStartingLocation('');
        // setCurrency("PLN");
        // setDescription('');
        close();
    }

    const close = () => {
        reset();
        setDayPlanName({ value: "", length: 0 });
        setDayPlanNameError("You have to provide day plan name.");
        setValues(defaultInputValues);
        onClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4">Create new day plan</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(() => handleCreateTrip(dayPlanName.value))}
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
                            error={Boolean(errors.dayPlanName) ? (Boolean(dayPlanNameError)) : false}
                            helperText={Boolean(errors.dayPlanName) && dayPlanNameError}
                            value={dayPlanName.value}
                            onChange={(event) => onDayPlanNameChange(event.target.value)}
                        />
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
                            </LocalizationProvider>
                        </Box>
                        <DialogContentText variant="body1" sx={{ my: "-10px" }}>
                            Icon:
                        </DialogContentText>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }} >
                            <TextField
                                sx={{ minWidth: "70px", width: "70px" }}
                                select
                                margin="normal"
                                name='icon'
                                variant="outlined"
                                {...register('icon')}
                                error={errors.icon ? true : false}
                                helperText={errors.icon?.message}
                                value={values.icon || ""}
                                onChange={(event) => handleChange({ ...values, icon: event.target.value })}
                            >
                                {icons.map((icon) => (
                                    <MenuItem key={icon.id} value={icon.value} >
                                        <Box sx={{ width: "50px", p: 0 }}>
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
                                color="primary"
                                sx={{ borderRadius: "20px" }}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};