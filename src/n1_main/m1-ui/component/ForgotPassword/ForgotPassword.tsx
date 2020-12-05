import React from "react";
import {useFormik} from "formik";
import {Avatar, Button, LinearProgress, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../m2-bll/forgotPassword-reducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {RequestStatusType, setStatusProgressAC} from "../../../m2-bll/login-reducer";
import style from "./ForgotPassword.module.scss"
import CustomSnackbar from "../../common/CustomSnackbar/CustomSnackbar";

const ForgotPassword = ({classes}: any) => {

    const dispatch = useDispatch();
    // NEED FIX!!!!!!!!!!!!!!!!!!!!
    const progress = useSelector<AppRootStateType, RequestStatusType>(state => state.login.progress)


    const formik = useFormik({
        initialValues: {
            email: "",
            from: "test-front-admin <wnbroz20@meta.ua>",
            message: `<div>password recovery link: <a href='https://andriiyarotskiy.github.io/cards/#/passwordChange/$token$'>TAP TAP TAP</a></div>`
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
    // snackbar
    // NEED FIX!!!!!!!!!!!!!!!!!!!!
    const isOpen = progress === "succeeded"

    const buttonDisabled = () => {
        if (progress === "loading") return true
    }
    // NEED FIX!!!!!!!!!!!!!!!!!!!!
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
                    <CustomSnackbar error={"This is a success message!"}
                                    dispatchCallback={() => setStatusProgressAC('idle')}
                                    open={isOpen}
                                    severity={"success"}
                                    sneckbarStyle={style.snackbarItem}
                    />
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