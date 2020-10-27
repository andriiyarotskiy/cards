import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {RequestStatusType} from "../../m2-bll/login-reducer";
import {Redirect, Route, Switch} from "react-router-dom";
import {CssBaseline, Grid, LinearProgress, Paper} from "@material-ui/core";
import React from "react";
import Login from "../component/Login/Login";
import Registration from "../component/Registration/Registration";
import ForgotPassword from "../component/ForgotPassword/ForgotPassword";


const AuthPage = () => {
    const classes = useStyles();
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const progress = useSelector<AppRootStateType, RequestStatusType>(state => state.login.progress)

    if (isAuth) {
        return <Redirect to={"/"}/>
    }

    return (
        <>
            {progress === "loading" ? <LinearProgress/> : null}
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Switch>
                            <Route exact path='/authPage/login' render={() => <Login progress={progress} classes={classes}/>}/>
                            <Route path='/authPage/registration' render={() => <Registration classes={classes}/>}/>
                            <Route path='/authPage/forgotPassword' render={() => <ForgotPassword classes={classes}/>}/>
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
export default AuthPage;


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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

