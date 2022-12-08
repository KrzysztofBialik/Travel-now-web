import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';
import { Avatar } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { doGet } from "../../components/utils/fetch-utils";
import { doPatch } from "../../components/utils/fetch-utils";
import { UpdatedUserConfirmationDialog } from './UpdatedUserConfirmationDialog';
import { ErrorUserConfirmationDialog } from './ErrorUserConfirmationDialog';
import { ErrorToast } from '../toasts/ErrorToast';



export const UserOptionsDialog = ({ open, onClose }) => {

    const today = new Date();
    const [userData, setUserData] = useState([])
    const [confirmUpdatedDialogOpen, setConfirmUpdateDialogOpen] = useState(false);
    const [confirmErrorToastOpen, setConfirmErrorToastOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);


    const getUserData = async () => {
        await doGet('/api/v1/user?' + new URLSearchParams({ userId: localStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => {
                setNecessaryData(response);
            })
            .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {
        getUserData();
    }, []);


    const setNecessaryData = (response) => {
        const allPhoneNumber = response.phoneNumber.split(" ");
        var code = allPhoneNumber[0].slice();
        code = code.slice(1, code.length)
        const phoneNumber = allPhoneNumber[1];
        setUserData({
            userId: response.userId, email: response.email, firstName: response.firstName, surname: response.surname,
            code: code, phone: phoneNumber, birthDate: response.birthday
        });
    }


    const validationSchema = Yup.object().shape({
        firstName: Yup
            .string()
            .required("You have to provide first name"),
        surname: Yup
            .string()
            .required("You have to provide surname"),
        code: Yup
            .string()
            .required("You have to provide country code")
            .min(1, "Country code too short")
            .max(4, "Country code too long")
            .matches(/^[0-9]{1,4}$/, "Country code is not valid"),
        phone: Yup
            .string()
            .required("You have to provide phone number")
            .min(5, "Phone number too short")
            .max(13, "Phone number too long")
            .matches(/^[0-9]{5,13}$/, "Phone number is not valid"),
        birthDate: Yup
            .date()
            .max(today)
            .required("You have to provide your birth date"),
    });

    const { register, handleSubmit, reset, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleChangeData = (values) => {
        editUserAccount(getValues());
    };

    const handleSuccess = () => {
        setConfirmUpdateDialogOpen(true);
    }


    const editUserAccount = async (values) => {
        setIsUpdating(true);
        console.log("hello there")
        console.log(values)
        var postBody = { 'userId': localStorage.getItem('userId'), 'phoneNumber': '+' + values.code + ' ' + values.phone, 'firstName': values.firstName, 'surname': values.surname, 'brithday': values.birthDate };
        await doPatch('/api/v1/user', postBody)
            .then(response => response.json())
            .then(response => {
                setNecessaryData(response);
                handleSuccess();
            })
            .catch(err => {
                setConfirmErrorToastOpen(true);
                setErrorMessage(err.message)
                console.log('Request Failed', err.message)
            });
        setIsUpdating(false);
    }

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <UpdatedUserConfirmationDialog
                open={confirmUpdatedDialogOpen}
                onClose={() => setConfirmUpdateDialogOpen(false)}
            />
            <ErrorToast
                open={confirmErrorToastOpen}
                onClose={() => setConfirmErrorToastOpen(false)}
                message="There was an error while updating your account. Sorry for inconvenience. Try again later."
            />
            {/* <ErrorUserConfirmationDialog
                open={confirmErrorDialogOpen}
                onClose={() => setConfirmErrorDialogOpen(false)}
                message={errorMessage}
            /> */}
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "primary.main",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Box sx={{ color: "#FFFFFF" }}>
                        Account settings
                    </Box>
                    <Button variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            backgroundColor: "secondary.main",
                            color: "#000000",
                            "&:hover": {
                                backgroundColor: "secondary.dark"
                            }
                        }}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        height: "100%",
                        position: "relative"
                    }}>
                        <Box
                            sx={{
                                width: "100%",
                                minWidth: '450px',
                                height: "600px",
                                my: 10,
                                display: 'flex',
                                overflow: "visible",
                                flexDirection: 'row',
                                justifyContent: "center"
                            }}
                        >
                            <Card
                                sx={{
                                    // marginTop: 10,
                                    overflow: "visible",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    overflowWrap: "break-word",
                                    backgroundClip: "border-box",
                                    width: "100%",
                                    minWidth: '400px',
                                    maxWidth: '500px',
                                    height: "100%",
                                    borderRadius: "10px",
                                }}
                                elevation={2}
                            >
                                <Box
                                    sx={{
                                        mx: 2,
                                        mt: -3,
                                        py: 1,
                                        px: 2,
                                        // background: "linear-gradient(195deg, rgb(85, 204, 217), rgb(36, 147, 158))",
                                        backgroundColor: "primary.main",
                                        color: "#000000",
                                        borderRadius: "0.5rem",
                                        boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography component="h1" variant="h5" color="#FFFFFF">
                                        Manage profile data
                                    </Typography>
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <PersonIcon sx={{ color: "primary.main" }} />
                                    </Avatar>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    margin: 2,
                                    px: '40px',
                                    pb: "20px",
                                    minHeight: "200px"
                                }}>
                                    <Box sx={{ height: "100%", width: "100%" }}>
                                        <form onSubmit={handleSubmit(handleChangeData)} >
                                            <TextField
                                                disabled
                                                type="string"
                                                name='email'
                                                label='Email'
                                                margin="normal"
                                                value={userData.email}
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailOutlinedIcon sx={{ color: "primary.main" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                type="string"
                                                margin="normal"
                                                placeholder='First name'
                                                name='First name'
                                                defaultValue={userData.firstName}
                                                label='First name'
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon sx={{ color: "primary.main" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...register('firstName')}
                                                error={!!errors.firstName}
                                                helperText={errors.firstName?.message}
                                            />
                                            <TextField
                                                type='string'
                                                margin="normal"
                                                placeholder='Surname'
                                                name='surname'
                                                defaultValue={userData.surname}
                                                label='Surname'
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon sx={{ color: "primary.main" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...register('surname')}
                                                error={!!errors.surname}
                                                helperText={errors.surname?.message}
                                            />
                                            <Typography variant="body1" color="text.secondary" mt="10px">
                                                Phone number:
                                            </Typography>
                                            <Box sx={{ display: "flex", mt: "-10px", mb: "10px" }} >
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <TextField
                                                        sx={{ minWidth: "100px", maxWidth: "100px", mr: "50px" }}
                                                        type='string'
                                                        margin="normal"
                                                        placeholder='Code'
                                                        name='code'
                                                        defaultValue={userData.code}
                                                        label='Code'
                                                        variant="outlined"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Typography sx={{ color: "primary.main" }}>
                                                                        +
                                                                    </Typography>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        {...register('code')}
                                                        error={!!errors.code}
                                                    // helperText={errors.code?.message}
                                                    />
                                                    <FormHelperText
                                                        error={!!errors.code}
                                                        sx={{
                                                            ml: 1,
                                                            mt: "-5px",
                                                            maxWidth: "120px"
                                                        }}
                                                    >
                                                        <span>{!!errors.code && errors.code?.message}</span>
                                                    </FormHelperText>
                                                </Box>
                                                <TextField
                                                    sx={{ minWidth: "150px", maxWidth: "300px" }}
                                                    type='string'
                                                    margin="normal"
                                                    placeholder='Phone'
                                                    name='phone'
                                                    defaultValue={userData.phone}
                                                    label='Phone'
                                                    variant="outlined"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PhoneIcon sx={{ color: "primary.main" }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('phone')}
                                                    error={!!errors.phone}
                                                    helperText={errors.phone?.message}
                                                />
                                            </Box>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Controller
                                                    name={"birthDate"}
                                                    defaultValue={userData.birthDate}
                                                    control={control}
                                                    sx={{ mb: 1 }}

                                                    render={({ field: { onChange, value } }) =>
                                                        <DatePicker
                                                            disableFuture
                                                            label="Birth date"
                                                            value={value}
                                                            onChange={onChange}
                                                            // components={{
                                                            //     OpenPickerIcon: CakeIcon
                                                            // }}
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    {...params}
                                                                    sx={{
                                                                        svg: { color: "#2ab7ca" },
                                                                        mt: 1,
                                                                        mb: 1,
                                                                        width: "50%",
                                                                        minWidth: "200px"
                                                                    }}
                                                                    onKeyDown={onKeyDown}
                                                                    // margin="normal"
                                                                    // InputProps={{
                                                                    //     startAdornment: (
                                                                    //         <InputAdornment position="start">
                                                                    //             <CakeIcon sx={{ color: "primary.main" }} />
                                                                    //         </InputAdornment>
                                                                    //     )
                                                                    // }}
                                                                    error={!!errors.birthDate}
                                                                    helperText={errors.birthDate?.message}
                                                                />
                                                            }

                                                            inputFormat="yyyy-MM-dd"
                                                        />
                                                    }
                                                />
                                            </LocalizationProvider>
                                            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        mt: 3, mb: 2, borderRadius: "20px", width: "150px", color: "#FFFFFF"
                                                    }}
                                                >
                                                    {isUpdating ?
                                                        <CircularProgress size="24px" sx={{ color: "#FFFFFF" }} />
                                                        :
                                                        "Change data"
                                                    }
                                                </Button>
                                            </Box>
                                        </form>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box >
                </DialogContent>
            </Dialog >
        </ >
    );
};