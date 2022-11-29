import * as React from 'react';
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Typography } from "@mui/material";
import { Controller } from "react-hook-form";
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


const participants = [
    {
        id: 1,
        name: "BoBa"
    },
    {
        id: 2,
        name: "Krzychu77"
    },
    {
        id: 3,
        name: "Olisadebe"
    },
    {
        id: 4,
        name: "Piterm33"
    },
    {
        id: 5,
        name: "BoBa"
    },
    {
        id: 6,
        name: "Krzychu77"
    },
    {
        id: 7,
        name: "Olisadebe"
    },
    {
        id: 8,
        name: "Piterm33"
    },
    {
        id: 9,
        name: "BoBa"
    },
    {
        id: 10,
        name: "Krzychu77"
    },
    {
        id: 11,
        name: "Olisadebe"
    },
    {
        id: 12,
        name: "Piterm33"
    },
    {
        id: 13,
        name: "BoBa"
    },
    {
        id: 14,
        name: "Krzychu77"
    },
    {
        id: 15,
        name: "Olisadebe"
    },
    {
        id: 16,
        name: "Piterm33"
    }
];

const debtors = [
    {
        id: 1,
        name: "BoBa"
    },
    {
        id: 2,
        name: "Krzychu77"
    },
    {
        id: 7,
        name: "Olisadebe"
    },
    {
        id: 12,
        name: "Piterm33"
    },
]

export const EditExpenseDialog = ({ open, onClose, expenseData, closeWithEdit }) => {

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    const selectedParticipants = participants.map((participant) => ({ formName: participant.id, checked: false }));

    const defaultInputValues = {
        expenseName: expenseData.title,
        price: expenseData.cost,
        selectedParticipants: selectedParticipants.map(participant => {
            const debtor = debtors.find(debtor => debtor.id === participant.formName);
            return debtor ? ({ ...participant, checked: true }) : participant
        })
    };

    console.log(defaultInputValues.expenseName);
    console.log(defaultInputValues.price);


    const validationSchema = Yup.object().shape({
        expenseName: Yup
            .string()
            .required("You have to provide name"),
        price: Yup
            .number()
            .positive("You have to provide cost of expense"),
        selectedParticipants: Yup
            .array()
            .of(
                Yup.object().shape({
                    formName: Yup.string(),
                    checked: Yup.boolean(),
                })
            )
            .compact((v) => !v.checked)
            .min(1, "You have to select min 1 person.")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const handleEditExpense = (values) => {
        // console.log(expenseName);
        // console.log(cost);
        // console.log(debtors);
        console.log(values);
        console.log(getValues());
        setSuccessToastOpen(true);
        close();
    };

    const close = () => {
        reset();
        closeWithEdit();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Expense edited." />
            <ErrorToast open={errorToastOpen} onClose={() => setErrorToastOpen(false)} message="Ups! Something went wrong. Try again." />

            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        minHeight: "500px",
                        maxHeight: "700px",
                        minWidth: "400px",
                        maxWidth: "400px",
                    },
                }}
            >
                <DialogTitle
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
                            Edit expense
                        </Typography>
                        <IconButton sx={{ mr: -1 }} onClick={onClose}>
                            <CloseIcon sx={{ color: "primary.main" }} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Box sx={{ height: "100%", width: "100%" }}>
                    <form
                        onSubmit={handleSubmit(handleEditExpense)}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <TextField
                                sx={{
                                    mx: 2
                                }}
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
                                {...register('expenseName')}
                                error={!!errors.expenseName}
                                helperText={errors.expenseName?.message}
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
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         PLN
                                    //     </InputAdornment>
                                    // )
                                }}
                                {...register('price')}
                                error={!!errors.price}
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
                            <FormControlLabel
                                sx={{ backgroundColor: "#dee2e6", mx: 0 }}
                                control={
                                    <Controller
                                        name={"selectedParticipants"}
                                        control={control}
                                        render={({ field: { onChange, value } }) =>
                                            <Checkbox
                                                checked={value.every((v) => v.checked)}
                                                onChange={() => onChange(value.some((v) => !v.checked) ?
                                                    value.map((v) => ({ ...v, checked: true })) : value.map((v) => ({ ...v, checked: false })))}
                                            />
                                        }
                                    />
                                }
                                label={"Contributors"}
                            />
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
                                            label={participant.name}
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
                        <DialogActions>
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: "20px" }}
                                onClick={() => { close() }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: "20px" }}
                            >
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </div >
    );
};