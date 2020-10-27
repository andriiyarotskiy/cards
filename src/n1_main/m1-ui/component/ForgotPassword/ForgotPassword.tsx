import React from "react";
import {useFormik} from "formik";
import {Avatar, Button, LinearProgress, Snackbar, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../m2-bll/forgotPassword-reducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {RequestStatusType, setStatusProgressAC} from "../../../m2-bll/login-reducer";
import {Alert} from "@material-ui/lab";
import style from "./ForgotPassword.module.scss"

const ForgotPassword = ({classes}: any) => {

    const dispatch = useDispatch();
    const progress = useSelector<AppRootStateType, RequestStatusType>(state => state.login.progress)


    const formik = useFormik({
        initialValues: {
            email: "",
            from: "test-front-admin <artem_ermakov_1999@mail.ru>",
            message: `<div>password recovery link: <a href='http://localhost:3000/#/passwordChange/$token$'>TAP TAP TAP</a></div>`
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(forgotPasswordTC(values))
            formik.resetForm();
        }
    })

    // snackbar // ПЛОХОЙ АДАПТИВ!!!!!
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setStatusProgressAC("idle"))
    };
    const isOpen = progress === "succeeded"

    // snackbar
    const buttonDisabled = () => {
        if (progress === "loading") return true
    }

    return (
        <>
            {progress === "loading" ? <LinearProgress/> : null}

            <Avatar className={classes.avatar}>

            </Avatar>
            <Typography component="h1" variant="h5">
                Restore Password
            </Typography>


            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={style.forgotPass}>
                    <TextField
                        variant="outlined" margin="normal"
                        required fullWidth autoFocus
                        id="email" label="Email Address"
                        name="email" autoComplete="email"
                        {...formik.getFieldProps("email")}/>
                    {/*{formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}*/}

                    <Button
                        disabled={buttonDisabled()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Restore password
                    </Button>
                    <Snackbar
                        className={style.snackbarItem}
                        open={isOpen}
                        autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </div>
            </form>

        </>
    )
}

//types
type FormikErrorType = {
    email?: string
}

export default ForgotPassword;