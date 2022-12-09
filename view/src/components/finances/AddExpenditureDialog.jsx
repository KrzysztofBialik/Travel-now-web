import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { FormGroup } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';
import { doPost, doGet } from "../utils/fetch-utils";


export const AddExpenditureDialog = ({ open, onClose, participants, groupId, onSuccess }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currency, setCurrency] = useState("");

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
        console.log(currency)
    }, [currency]);

    const defaultInputValues = {
        expenditureName: "",
        price: "0.00",
        selectedParticipants: participants.map((participant) => ({ formName: participant.id, checked: false }))
    };

    const postExpenditure = async (values) => {
        setIsAdding(true);
        var postBody = {
            'creatorId': localStorage.getItem('userId'), title: values.expenditureName, price: values.price,
            debtorsIds: values.selectedParticipants.map(s => s.formName)
        };
        await doPost('/api/v1/finance-optimizer?' + new URLSearchParams({ groupId: groupId }).toString(), postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                setIsAdding(false);
                onSuccess();
            })
            .catch(err => {
                setIsAdding(false);
                setErrorToastOpen(true);
                setErrorToastOpen(err.message)
            });
    };

    const validationSchema = Yup.object().shape({
        expenditureName: Yup
            .string()
            .required("You have to provide expenditure name"),
        price: Yup
            .number()
            .positive("You have to provide cost of expenditure"),
        selectedParticipants: Yup
            .array()
            .of(
                Yup.object().shape({
                    formName: Yup.string(),
                    checked: Yup.boolean(),
                })
            )
            .compact((v) => !v.checked)
            .min(1, "You have to select min 1 person")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const handleAddExpenditure = (values) => {
        postExpenditure(values);
        close();
    };

    const close = () => {
        reset();
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="New expenditure added." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        maxHeight: "700px",
                        minWidth: "400px",
                        maxWidth: "400px",
                        borderRadius: "20px"
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFFFFF"
                    }}
                >
                    <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                        New expenditure
                    </Typography>
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={close}
                    >
                        <CloseIcon sx={{ color: "secondary.main", fontSize: "32px" }} />
                    </IconButton>
                </DialogTitle>
                {/* <DialogTitle
                    sx={{
                        color: "primary.main",
                        display: "flex",
                        flexDirection: "column",
                        pb: 0
                    }}
                >
                    <Box sx={{
                        width: "100%",
                        color: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography sx={{ fontSize: "28px" }}>
                            New expenditure
                        </Typography>
                        <IconButton sx={{ mr: -1 }} onClick={close}>
                            <CloseIcon sx={{ color: "primary.main" }} />
                        </IconButton>
                    </Box>
                </DialogTitle> */}
                <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
                    <form
                        onSubmit={handleSubmit(handleAddExpenditure)}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <TextField sx={{ mx: 2 }}
                                type='string'
                                autoFocus
                                margin="normal"
                                placeholder='Name'
                                name='name'
                                label='Name'
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EditIcon sx={{ color: "primary.main" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('expenditureName')}
                                error={!!errors.expenditureName}
                                helperText={errors.expenditureName?.message}
                            />
                            <TextField
                                sx={{ minWidth: "200px", width: "200px", mx: 2, mb: 0 }}
                                type="number"
                                margin="normal"
                                step='any'
                                placeholder='Price'
                                name='price'
                                label='Price'
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0, step: 0.01 },
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
                            // error={Boolean(errors.price) ? (Boolean(priceError)) : false}
                            // helperText={Boolean(errors.price) && priceError}
                            // value={price}
                            // onChange={(event) => onPriceChange(event.target.value)}
                            />
                            <FormHelperText
                                error={!!errors.price}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    ml: 3,
                                    mb: 3
                                }}
                            >
                                <span>{!!errors.price && errors.price?.message}</span>
                            </FormHelperText>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", overflow: "none" }}>
                            <Typography
                                sx={{ backgroundColor: "#dee2e6", pl: 2, py: 1, fontSize: "25px" }}

                            >Contributors</Typography>
                            {/* <FormControlLabel
                                sx={{ backgroundColor: "#dee2e6", mx: 0 }}
                                // control={
                                //     <Controller
                                //         name={"selectedParticipants"}
                                //         control={control}
                                //         render={({ field: { onChange, value } }) =>
                                //             <Checkbox
                                //                 checked={value.every((v) => v.checked)}
                                //                 onChange={() => onChange(value.some((v) => !v.checked) ?
                                //                     value.map((v) => ({ ...v, checked: true })) : value.map((v) => ({ ...v, checked: false })))}
                                //             />
                                //         }
                                //     />
                                // }
                                label={"Contributors"}
                            /> */}
                        </Box>
                        <Box sx={{ display: "flex", maxHeight: "240px", flexDirection: "column", ml: 3, mb: 2, overflow: "auto" }}>
                            <FormGroup                            >
                                {participants.map((participant) => {
                                    return (
                                        <FormControlLabel
                                            // sx={{ m: 0 }}
                                            control={
                                                <Controller
                                                    name={"selectedParticipants"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) =>
                                                        <Checkbox
                                                            checked={value.find((v) => v.formName === participant.id)?.checked}
                                                            onChange={() => onChange([...value.filter((v) => v.formName !== participant.id),
                                                            { formName: participant.id, checked: !(value.find((v) => v.formName === participant.id)?.checked) }])}
                                                        />
                                                    }
                                                />
                                            }
                                            label={participant.fullName}
                                            key={participant.id}
                                        />
                                    );
                                })}
                            </FormGroup>
                        </Box>
                        <FormHelperText
                            error={!!errors.selectedParticipants}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 10px",
                                pb: "30px"
                            }}
                        >
                            <span>{!!errors.selectedParticipants && errors.selectedParticipants?.message}</span>
                        </FormHelperText>
                        <DialogActions sx={{ mb: 1, mr: 1 }}>
                            {isAdding ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ borderRadius: "20px", color: "#FFFFFF", width: "80px" }}
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
                                        sx={{ borderRadius: "20px", color: "#FFFFFF", width: "80px" }}
                                    >
                                        Add
                                    </Button>
                                </>
                            }
                            {/* <Button
                                variant="outlined"
                                sx={{ borderRadius: "20px" }}
                                onClick={() => {
                                    setErrorToastOpen(true)
                                    close()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: "20px" }}
                            // onClick={() => handleCreateTransport}
                            >
                                Add
                            </Button> */}
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </div >
    );
};