import React, {KeyboardEvent} from "react";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {InitialStateLoginType, LoginTC, setStatusProgressAC} from "../../../m2-bll/login-reducer";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import style from "./Login.module.scss"
import CustomSnackbar from "../../common/CustomSnackbar/CustomSnackbar";
import ErrorIcon from "@material-ui/icons/Error";
import {AppRootStateType} from "../../../m2-bll/store";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


type LoginFormType = {
    classes: any
}


const Login = ({classes}: LoginFormType) => {
    const {progress, error} = useSelector<AppRootStateType, InitialStateLoginType>(state => state.login)


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

    // Input settings
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        formik.setTouched({}, false)
    }
    const isErrorEmail = !!(formik.touched.email && formik.errors.email)
    const isErrorPass = !!(formik.touched.password && formik.errors.password)
    // Input settings

    // snackbar
    const isOpen = progress === "failed"
    // snackbar
    // btn disable
    const buttonDisabled = () => {
        if (progress === "loading" || !formik.values.email || !formik.values.password) return true
    }
    return (
        <>
            {progress === "loading"
                ? <div className={style.circularProgress}><CircularProgress/></div>
                : <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
            }
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <div className={style.loginPage}>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <div className={style.customInput}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required fullWidth
                            id="email" name="email" label="Email Address"
                            onKeyPress={onKeyPressHandler}
                            error={isErrorEmail}
                            autoComplete="email" autoFocus
                            helperText={<span style={{color: "red", position: "absolute"}}>{formik.errors.email}</span>}
                            {...formik.getFieldProps("email")}
                        />
                        {isErrorEmail
                            ? <div className={style.iconError}>
                                <ErrorIcon color="secondary"/>
                            </div>
                            : null}
                    </div>
                    <div className={style.customInput}>
                        <div className={style.customInput}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required fullWidth
                                name="password" label="Password" type="password" id="password"
                                autoComplete="current-password"
                                {...formik.getFieldProps("password")}
                                error={isErrorPass}
                                helperText={<span
                                    style={{color: "red", position: "absolute"}}>{formik.errors.password}</span>}
                            />
                            {isErrorPass
                                ? <div className={style.iconError}>
                                    <ErrorIcon color="secondary"/>
                                </div>
                                : null}
                        </div>
                    </div>

                    <FormControlLabel
                        control={<Checkbox {...formik.getFieldProps("rememberMe")} color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        disabled={buttonDisabled()}
                        type="submit" fullWidth
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
                    <CustomSnackbar error={error}
                                    sneckbarStyle={style.snackbarItem}
                                    dispatchCallback={() => setStatusProgressAC("idle")}
                                    open={isOpen}
                                    severity={"error"}/>
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

