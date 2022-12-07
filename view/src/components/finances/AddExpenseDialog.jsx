import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { Controller } from "react-hook-form";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
import CommuteIcon from '@mui/icons-material/Commute';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import { SuccessToast } from '../toasts/SuccessToast';
import { ErrorToast } from '../toasts/ErrorToast';

import { doPost } from "../../components/utils/fetch-utils";

// const participants = [
//     {
//         id: 1,
//         name: "BoBa"
//     },
//     {
//         id: 2,
//         name: "Krzychu77"
//     },
//     {
//         id: 3,
//         name: "Olisadebe"
//     },
//     {
//         id: 4,
//         name: "Piterm33"
//     }
// ];

export const AddExpenseDialog = ({ open, onClose, participants, groupId, onSuccess }) => {

    // const { control, setValue } = useFormContext();
    // const [selectedParticipants, setSelectedParticipants] = useState([]);
    // const [selectedParticipantsError, setSelectedParticipantsError] = useState("You have to select min 1 person.")
    const [everyoneSelected, setEveryoneSelected] = useState(false);

    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);

    // const [expenseName, setExpenseName] = useState({ value: "", length: 0 });
    // const [expenseNameError, setExpenseNameError] = useState("You have to provide expense name.");

    // const [price, setPrice] = useState("");
    // const [priceError, setPriceError] = useState("You have to provide a price that is not a negative number.");

    const defaultInputValues = {
        expenseName: "",
        price: "0.00",
        selectedParticipants: participants.map((participant) => ({ formName: participant.id, checked: false }))
    };

    const postExpenditure = async (values) => {
        console.log("Boba chuj")
        console.log(values.selectedParticipants)

        var postBody = {
            'creatorId': localStorage.getItem('userId'), title: values.expenseName, price: values.price,
            debtorsIds: values.selectedParticipants.map(s => s.formName)
        };
        await doPost('/api/v1/finance-optimizer?' + new URLSearchParams({ groupId: groupId }).toString(), postBody)
            .then(response => {
                setSuccessToastOpen(response.ok);
                onSuccess();
            })
            .catch(err => {
                setErrorToastOpen(true);
                setErrorToastOpen(err.message)
            });
    }



    const validationSchema = Yup.object().shape({
        expenseName: Yup
            .string()
            .required("You have to provide expense name"),
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
            .min(1, "You have to select min 1 person")
    });

    const { register, handleSubmit, reset, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues
    });

    const handleAddExpense = (values) => {

        console.log(values);
        console.log(getValues());
        postExpenditure(values);
        close();
    };

    const close = () => {
        reset();
        // setExpenseName({ value: "", length: 0 });
        // setExpenseNameError("You have to provide expense name.");
        // setPrice("");
        // setPriceError("You have to provide a price that is not a negative number.");
        // setSelectedParticipants([]);
        // setEveryoneSelected(false);
        // setValues(defaultInputValues);
        onClose();
    };

    return (
        <div>
            <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="New expense added." />
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
                        // minWidth: "700px"
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
                            New expense
                        </Typography>
                        <IconButton sx={{ mr: -1 }} onClick={close}>
                            <CloseIcon sx={{ color: "primary.main" }} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Box sx={{ height: "100%", width: "100%" }}>
                    <form
                        onSubmit={handleSubmit(handleAddExpense)}
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
                                {...register('expenseName')}
                                error={!!errors.expenseName}
                                helperText={errors.expenseName?.message}
                            // error={Boolean(errors.expenseName) ? (Boolean(expenseNameError)) : false}
                            // helperText={Boolean(errors.expenseName) && expenseNameError}
                            // value={expenseName.value}
                            // onChange={(event) => onExpenseNameChange(event.target.value)}
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
                        <DialogActions>
                            <Button
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
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </div >
    );
};