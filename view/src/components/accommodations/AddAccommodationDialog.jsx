import * as React from 'react';
import { useState } from "react";
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
    const DESCRIPTION_LIMIT = 250;

    const defaultInputValues = {
        link: "",
        price: 0,
        description: ""
    };

    const validationSchema = Yup.object().shape({
        link: Yup
            .string()
            .url("This is not a valid url")
            .required("You have to provide url to accommodation")
            .max(250, "Too long url, maximum is 250 characters"),
        price: Yup
            .number()
            .positive("Price must be a positive number")
            .required("You have to provide price for accommodation"),
        description: Yup
            .string()
            .max(250, "Description is too long")
    });

    const handleAddAccommodation = async (values) => {
        setIsAdding(true);
        var postBody = { 'groupId': groupId, 'creatorId': parseInt(localStorage.getItem('userId')), 'accommodationLink': values.link, 'description': values.description, 'price': parseFloat(values.price) };
        await doPost('/api/v1/accommodation', postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                close();
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
            });
        setIsAdding(false);
    };

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const descriptionWatch = watch("description");

    const close = () => {
        reset();
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
                    <DialogContentText variant="h6">
                        https://www.booking.com/[name of the hotel]
                    </DialogContentText>
                    <DialogContentText variant="body1" mb="20px">
                        everything after and including first comma should be deleted
                    </DialogContentText>
                    <form
                        onSubmit={handleSubmit(handleAddAccommodation)}
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
                            error={!!errors.link}
                            helperText={errors.link?.message}
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
                            error={!!errors.price}
                        />
                        <FormHelperText
                            error={!!errors.price}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: "-5px",
                                ml: 2,
                                mb: 3
                            }}
                        >
                            <span>{!!errors.price && errors.price?.message}</span>
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
                            <span>{`${descriptionWatch ? descriptionWatch.length : 0}/${DESCRIPTION_LIMIT}`}</span>
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
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};