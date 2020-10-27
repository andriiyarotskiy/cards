import React from "react";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {Avatar, Button, Checkbox, FormControlLabel, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {LoginTC, setStatusProgressAC} from "../../../m2-bll/login-reducer";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import style from "./Login.module.scss"
import {Alert} from "@material-ui/lab";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


type LoginFormType = {
    progress: string
    classes: any
}


const Login = ({progress, classes}: LoginFormType) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 7) {
                errors.password = "Password > 7 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(LoginTC(values))
        }
    })

    // snackbar
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setStatusProgressAC("idle"))
    };
    const isOpen = progress === "failed"

    // snackbar

    const buttonDisabled = () => {
        if (progress === "loading" || !formik.values.email || !formik.values.password) return true
    }
    return (
        <>

            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <div className={style.loginPage}>


                <form onSubmit={formik.handleSubmit} className={classes.form}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...formik.getFieldProps("email")}
                        helperText={<span style={{color: "red", position: "absolute"}}>{formik.errors.email}</span>}
                    />
                    {/*{formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}*/}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...formik.getFieldProps("password")}
                        helperText={<span style={{color: "red", position: "absolute"}}>{formik.errors.password}</span>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...formik.getFieldProps("rememberMe")} color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        disabled={buttonDisabled()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <NavLink to="/authPage/forgotPassword">Forgot password?</NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/authPage/registration">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                    <Snackbar
                        className={style.snackbarItem}
                        open={isOpen}
                        autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            This is a Error message!
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </>
    )
}

export default Login;


/*

{formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}

{formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
*/

