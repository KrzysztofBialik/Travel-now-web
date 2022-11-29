import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';


export const SelectAttractionDialog = ({ open, onClose, attractionData, closeWithSelect }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const [attractionName, setAttractionName] = useState(attractionData.name);
    console.log(attractionData)

    const DESCRIPTION_LIMIT = 250;
    const [description, setDescription] = useState({ value: "", length: 0 });
    const [descriptionError, setDescriptionError] = useState(description.length > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null);

    const defaultInputValues = {
        attractionName,
        description
    };

    const [values, setValues] = useState(defaultInputValues);

    const onDescriptionChange = (value) => {
        setDescriptionError(
            value.length > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null
        );
        setDescription({ value: value, length: value.length });
    };

    const validationSchema = Yup.object().shape({
        description: Yup
            .string()
            .max(250)
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const handleAddAttraction = (name, description) => {
        // editAccommodation(price, description);
        // setSuccessToastOpen(true);
        // // setTripName('');
        // // setStartingLocation('');
        // // setCurrency("PLN");
        // // setDescription('');
        reset();
        setValues(defaultInputValues);
        setDescription({ value: "", length: 0 });
        setSuccessToastOpen(true);
        onClose();
        closeWithSelect();
    }

    const close = () => {
        reset();
        setValues(defaultInputValues);
        setDescription({ value: "", length: 0 });
        setSuccessToastOpen(true);
        onClose();
    }

    const handleErrorClose = () => {
        setDescription({ value: "", length: 0 });
        setErrorToastOpen(true);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Attraction successfully added." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4" sx={{ backgroundColor: "primary.main", color: "#FFFFFF", mb: "10px" }}>Select attraction</DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1" mb="30px">
                        Add description to your selected attraction.
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(() => handleAddAttraction(attractionName, description.value))}
                    >
                        <TextField
                            type="string"
                            disabled
                            autoFocus
                            margin="normal"
                            step='any'
                            name='attractionName'
                            fullWidth
                            variant="outlined"
                            {...register('price')}
                            value={attractionData.name}
                        />
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
                                varaint="outlined"
                                onClick={handleErrorClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: "#FFFFFF" }}
                            >
                                Select
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};