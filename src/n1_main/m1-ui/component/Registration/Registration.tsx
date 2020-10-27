import React, {KeyboardEvent} from "react";
import {useFormik} from "formik";
import {RegistrationDataType} from "../../../m3-dal/api";
import {InitialStateType, registrationTC, setErrorRegistration} from "../../../m2-bll/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import {Avatar, Button, LinearProgress, Snackbar, TextField, Typography} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import style from "./Registration.module.scss"


const validate = (value: RegistrationDataType) => {
    let error: any = {};
    if (!value.email) {
        error.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
        error.email = 'Invalid email address';
    }
    if (!value.password) {
        error.password = 'Enter you password';
    } else if (value.password.length < 7) {
        error.password = 'Password must be 8 characters or more'
    } else if (!value.repeatPassword) {
        error.repeatPassword = 'Please repeat you password';
    } else if (value.repeatPassword !== value.password) {
        error.password = 'Your passwords are not equal';
        error.repeatPassword = 'Your passwords are not equal';
    }
    return error;
}

const Registration = ({classes}: any) => {
    const dispatch = useDispatch()
    const {isLoggedIn, error, loaderStatus} = useSelector<AppRootStateType, InitialStateType>(state => state.registration)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validate,
        onSubmit: values => {
            const {email, password} = values
            dispatch(registrationTC({email, password}))
        },
    });
    // SnackBarr Error
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorRegistration(null));
    }
    const isOpen = error !== null;
    // Input Error

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        formik.setTouched({}, false)
    }
    const isErrorEmail = !!(formik.touched.email && formik.errors.email)
    const isErrorPass = !!(formik.touched.password && formik.errors.password)
    const isErrorRepeatPass = !!(formik.touched.repeatPassword && formik.errors.repeatPassword)
    // Input Error
    // Redirect to Login after successful registration
    if (isLoggedIn) {
        return <Redirect to={"/authPage/login"}/>
    }

    return (
        <>
            {loaderStatus === "loading" && <LinearProgress/>}

            <Avatar className={classes.avatar}>
                {/*ICON*/}
            </Avatar>

            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={style.customInput}>
                    <TextField
                        variant="outlined" margin="normal"
                        required fullWidth
                        id="email" label="Email Address"
                        name="email" autoComplete="email"
                        onKeyPress={onKeyPressHandler}
                        error={isErrorEmail}
                        helperText={<span style={{color: "red", position: "absolute"}}>{formik.errors.email}</span>}
                        {...formik.getFieldProps('email')}
                    />
                    {isErrorEmail
                        ? <div className={style.iconError}>
                            <ErrorIcon color="secondary"/>
                        </div>
                        : null}
                </div>
                <div className={style.customInput}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onKeyPress={onKeyPressHandler}
                        id="password"
                        autoComplete="current-password"
                        error={isErrorPass}
                        {...formik.getFieldProps('password')}
                        helperText={<span style={{color: "red", position: "absolute"}}>{formik.errors.password}</span>}
                    />
                    {isErrorPass
                        ? <div className={style.iconError}>
                            <ErrorIcon color="secondary"/>
                        </div>
                        : null}
                </div>
                <div className={style.customInput}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Repeat Password"
                        type="password"
                        id="repeatPassword"
                        autoComplete="current-password"
                        name="repeatPassword"
                        onKeyPress={onKeyPressHandler}
                        error={isErrorRepeatPass}
                        helperText={<span
                            style={{color: "red", position: "absolute"}}>{formik.errors.repeatPassword}</span>}
                        {...formik.getFieldProps('repeatPassword')}
                    />
                    {isErrorRepeatPass && isErrorPass
                        ? <div className={style.iconError}>
                            <ErrorIcon color="secondary"/>
                        </div>
                        : null}
                </div>
                <Button
                    disabled={loaderStatus === "loading"}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <div className={style.snackBarContainer}>
                    <Snackbar
                        className={style.snackbarItem}
                        open={isOpen} autoHideDuration={5000} onClose={handleClose}>
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                </div>
            </form>
        </>
    )
}

export default Registration;