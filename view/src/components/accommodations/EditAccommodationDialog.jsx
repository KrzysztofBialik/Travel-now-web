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


export const EditAccommodationDialog = ({ open, onClose, editAccommodation }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const [price, setPrice] = useState("0");
    const [priceError, setPriceError] = useState("Price of accommodation must be a positive number.");

    const DESCRIPTION_LIMIT = 250;
    const [description, setDescription] = useState({ value: "", length: 0 });
    const [descriptionError, setDescriptionError] = useState(null);

    const defaultInputValues = {
        price,
        description
    };

    const [values, setValues] = useState(defaultInputValues);

    const onPriceChange = (value) => {
        setPriceError(
            value <= 0 ? "Price of accommodation must be a positive number." : null
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
        price: Yup
            .number()
            .positive(),
        description: Yup
            .string()
            .max(250)
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // const handleChange = (value) => {
    //     setValues(value);
    //     console.log(values);
    // };

    const handleEditAccommodation = (price, description) => {
        // editAccommodation(price, description);
        // setSuccessToastOpen(true);
        // // setTripName('');
        // // setStartingLocation('');
        // // setCurrency("PLN");
        // // setDescription('');
        close();
    }

    const close = () => {
        reset();
        setValues(defaultInputValues);
        setPrice("0");
        setPriceError("Price of accommodation must be a positive number.");
        setDescription({ value: "", length: 0 });
        setSuccessToastOpen(true);
        onClose();
    }

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Accommodation successfully edited." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4">Edit accommodation</DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1" mb="30px">
                        Edit price and description of your accommodation option.
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(() => handleEditAccommodation(price, description.value))}
                    >
                        <TextField
                            sx={{ width: "120px" }}
                            type="number"
                            autoFocus
                            margin="normal"
                            step='any'
                            placeholder='Price'
                            name='price'
                            label='Price'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        zł
                                    </InputAdornment>
                                )
                            }}
                            {...register('price')}
                            error={Boolean(errors.price) ? (Boolean(priceError)) : false}
                            value={price}
                            onChange={(event) => onPriceChange(event.target.value)}
                        />
                        <FormHelperText
                            error={Boolean(priceError)}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 10px",
                            }}
                        >
                            <span>{Boolean(errors.price) && priceError}</span>
                        </FormHelperText>

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
                            <Button onClick={handleErrorClose}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
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