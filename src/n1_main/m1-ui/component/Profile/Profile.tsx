import React, {useEffect} from "react";
import style from "./Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {authMeTC, logOutTC} from "../../../m2-bll/profile-reducer";
import {Button, LinearProgress} from "@material-ui/core";
import {Redirect} from "react-router-dom";

type  userDataType = { email: string, name: string }

export const Profile = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const userData = useSelector<AppRootStateType, userDataType>(state => state.profile.userData)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])

    const logOutClick = () => {
        dispatch(logOutTC())
    }

    if (isInitialized) {
        return <div style={{position: 'fixed', top: '0', textAlign: 'center', width: '100%'}}>
            <LinearProgress/>
        </div>
    }
    if (!isAuth) {
        return <Redirect to="/authPage/login"/>
    }
    return (
        <div className={style.mainBlock}>
            <div className="container">
                <h1 className={style.title}>Main page</h1>
                <h3>{userData.name}</h3>
                <Button onClick={logOutClick} variant="contained" color="primary">Log Out</Button>
            </div>
        </div>
    )
}