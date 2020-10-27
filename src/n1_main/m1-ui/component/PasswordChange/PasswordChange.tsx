import React from "react";
import {Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {changePasswordTC, InitialStateType} from "../../../m2-bll/changePassword-reducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";

const PasswordChange = () => {
    // style
    const classes = useStyles();
    // style

    const {isCorrectPass, setPassword} = useSelector<AppRootStateType, InitialStateType>(state => state.changePassword)

    const dispatch = useDispatch();

    const {token} = useParams();
    console.log(isCorrectPass)

    const formik = useFormik({
        initialValues: {
            password: "",
            resetPasswordToken: token
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 7) {
                errors.password = "Password > 7 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            debugger
            dispatch(changePasswordTC(values))
            console.log(values)
        }
    })

    // const buttonDisabled = () => {
    //     if (isCorrectPass || !formik.values.password || !formik.values.resetPasswordToken) return true
    // }

    if (setPassword) {
        return <Redirect to={"/"}/>
    }

    return (
        <>
            {isCorrectPass ? <LinearProgress/> : null}

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <form onSubmit={formik.handleSubmit} className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...formik.getFieldProps("password")}
                            helperText={<span style={{color: "red", position: "fixed"}}>{formik.errors.password}</span>}
                        />
                        <Button
                            disabled={isCorrectPass}
                            type="submit"
                            fullWidth variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            change password
                        </Button>
                    </form>
                </div>
            </Container>

        </>
    )
}

type FormikErrorType = {
    password?: string
    resetPasswordToken?: string
}

export default PasswordChange;


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));