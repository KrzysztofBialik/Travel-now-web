import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { TextField } from '@mui/material';
import { CardMedia } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPatch } from "../../components/utils/fetch-utils";
import { PLACEHOLDER_IMAGE } from '../images/Images';


export const EditAttractionDialog = ({ open, onClose, attractionData }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const [attractionName, setAttractionName] = useState(attractionData.name);

    const DESCRIPTION_LIMIT = 250;
    const descriptionLength = attractionData.description === null ? 0 : attractionData.description.length;
    const [description, setDescription] = useState({ value: attractionData.description, length: descriptionLength });
    const [descriptionError, setDescriptionError] = useState(descriptionLength > DESCRIPTION_LIMIT ? "You have exceeded characters limit for description" : null);
    const [editionError, setEditionError] = useState("Ups! Something went wrong. Try again.");

    var getPhotoUrl = (photoReference) => {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    };

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


    const handleEditAttraction = async (name, description) => {
        attractionData.description = description;
        await doPatch('/api/v1/attraction', attractionData)
            .then(response => {
                setSuccessToastOpen(response.ok);
                setErrorToastOpen(!response.ok);
                close();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setEditionError(err.message)
            });

    }

    const close = () => {
        reset();
        setValues(defaultInputValues);
        setDescription({ value: attractionData.description, length: descriptionLength });
        setSuccessToastOpen(true);
        onClose();
    }

    const handleErrorClose = () => {
        setDescription({ value: attractionData.description, length: descriptionLength });
        onClose();
    };

    const handleEdit = async (description) => {

    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Attraction successfully edited." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message={editionError} />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        minWidth: "500px",
                        maxWidth: "500px",
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
                        Edit day plan
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={onClose}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText variant="body1" mb="20px">
                        Edit description of attraction.
                    </DialogContentText>
                    <CardMedia
                        sx={{ borderRadius: "10px" }}
                        component="img"
                        image={attractionData.photoLink !== null ? getPhotoUrl(attractionData.photoLink) : PLACEHOLDER_IMAGE}
                    />
                    <form
                        onSubmit={handleSubmit(() => handleEditAttraction(attractionName, description.value))}
                    >
                        <TextField
                            type="string"
                            disabled
                            autoFocus
                            margin="normal"
                            step='any'
                            name='attractionName'
                            label='Attraction name'
                            fullWidth
                            variant="outlined"
                            {...register('price')}
                            value={attractionName}
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
                                variant="outlined"
                                sx={{ borderColor: "primary.main", borderRadius: "20px" }}
                                onClick={handleErrorClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: "#FFFFFF", borderRadius: "20px" }}
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