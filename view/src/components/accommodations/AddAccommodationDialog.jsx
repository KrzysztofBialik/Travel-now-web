import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { FormHelperText } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';

import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPost } from '../utils/fetch-utils';


export const AddAccommodationDialog = ({ open, onClose, groupId, onSuccess, currency }) => {

    const [isAdding, setIsAdding] = useState(false);
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [creationError, setCreationError] = useState("Ups! Something went wrong. Try again.");

    const [link, setLink] = useState({ value: "", length: 0 });
    const [linkError, setLinkError] = useState("You have to provide a valid url.");

    const [price, setPrice] = useState("0");
    const [priceError, setPriceError] = useState("Price of accommodation must be a positive number.");

    const DESCRIPTION_LIMIT = 250;
    const [description, setDescription] = useState({ value: "", length: 0 });
    const [descriptionError, setDescriptionError] = useState(null);

    const defaultInputValues = {
        link,
        price,
        description
    };

    const [values, setValues] = useState(defaultInputValues);

    const onLinkChange = (value) => {
        const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        setLinkError(
            value.length === 0 ? "You have to provide a valid url." : null
        );
        setLinkError(
            !regex.test(value) ? "You have to provide a valid url." : null
        );
        setLink({ value: value, length: value.length });
    };

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
        link: Yup
            .string()
            .url()
            .required(),
        price: Yup
            .number()
            .positive(),
        description: Yup
            .string()
            .max(250)
    });

    const handleAddAccommodation = async (link, price, description) => {
        setIsAdding(true);
        var postBody = { 'groupId': groupId, 'creatorId': parseInt(sessionStorage.getItem('userId')), 'accommodationLink': link, 'description': description, 'price': parseFloat(price) };
        await doPost('/api/v1/accommodation', postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                close();
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
                // setCreationError(err.message)
            });
        setIsAdding(false);
    };


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const close = () => {
        reset();
        setValues(defaultInputValues);
        setLink({ value: "", length: 0 });
        setLinkError("You have to provide a valid url.");
        setPrice("0");
        setPriceError("Price of accommodation must be a positive number.");
        setDescription({ value: "", length: 0 });
        onClose();
    };

    const handleErrorClose = () => {
        setErrorToastOpen(true);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Accommodation successfully added." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={creationError} />

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
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
                        Add accommodation
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={close}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1">
                        Provide link to booking or airbnb, price and description. If you use link
                        from booking.com make sure it has the following structure:
                    </DialogContentText>
                    <DialogContentText variant="body1" mb="20px">
                        "https://www.booking.com/[name of the hotel]{"delete rest"}"
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(() => handleAddAccommodation(link.value, price, description.value))}
                    >
                        <TextField
                            type='string'
                            autoFocus
                            margin="normal"
                            step='any'
                            placeholder='Link'
                            name='link'
                            label='Link'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('link')}
                            error={Boolean(errors.link) ? (Boolean(linkError)) : false}
                            helperText={Boolean(errors.link) && linkError}
                            value={link.value}
                            onChange={(event) => onLinkChange(event.target.value)}
                        />

                        <TextField
                            sx={{ minWidth: "180px", width: "180px" }}
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
                            {isAdding ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", width: "90px" }}
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
                                        sx={{ borderRadius: "20px", color: "#FFFFFF", width: "90px" }}
                                    >
                                        Add
                                    </Button>
                                </>
                            }
                            {/* <Button 
                            variant="outlined"
                            onClick={onClose}
                            >
                                Cancel
                                </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button> */}
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};