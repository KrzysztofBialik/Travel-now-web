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
import { doPatch } from "../../components/utils/fetch-utils";


export const EditAccommodationDialog = ({ open, onClose, accommodationData }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [editionError, setEditionError] = useState('Ups! Something went wrong. Try again.');

    const [price, setPrice] = useState(accommodationData.price);
    const [priceError, setPriceError] = useState("Price of accommodation must be a positive number.");

    const DESCRIPTION_LIMIT = 250;
    const descriptionLength = accommodationData.description === null || accommodationData.description === undefined  ? 0 : accommodationData.description.length;
    const [description, setDescription] = useState({ value: accommodationData.description === undefined ? "" : accommodationData.description, length: descriptionLength });
    const [descriptionError, setDescriptionError] = useState(descriptionLength > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null);

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

    const handleEditAccommodation = async (price, description) => {
        var updated = accommodationData;
        updated.description = description;
        updated.price = price;
        await doPatch('/api/v1/accommodation?' + new URLSearchParams({ accommodationId:accommodationData.accommodationId, userId:localStorage.getItem("userId") }).toString(), updated)
            .then(response => {
                setSuccessToastOpen(response.ok);
                close();
            })
            .catch(err => {setErrorToastOpen(true); 
                setEditionError(err.message)
            });
    }

    const close = () => {
        reset();
        setValues(defaultInputValues);
        setPrice(accommodationData.price);
        setPriceError("Price of accommodation must be a positive number.");
        setDescription({ value: accommodationData.description, length: descriptionLength });
        setSuccessToastOpen(true);
        onClose();
    }

    const handleErrorClose = () => {
        setPrice(accommodationData.price);
        setPriceError("Price of accommodation must be a positive number.");
        setDescription({ value: accommodationData.description, length: descriptionLength });
        setErrorToastOpen(true);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Accommodation successfully edited." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={editionError} />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h4" sx={{ backgroundColor: "primary.main", color: "#FFFFFF", mb: "10px" }}>Edit accommodation</DialogTitle>
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
                            <Button
                                varaint="outlined"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: "#FFFFFF" }}
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