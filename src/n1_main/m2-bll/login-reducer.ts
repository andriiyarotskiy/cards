import {ActionTypes} from "./store";
import {authAPI, LoginParamsType} from "../m3-dal/api";
import {Dispatch} from "redux";
import {setProfileDataAC} from "./profile-reducer";

const loginReducer = (state: InitialStateLoginType = InitialStateLogin, action: ActionTypes) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isAuth: action.value}
        }
        case "login/SET-STATUS-PROGRESS": {
            return {...state, progress: action.progress}
        }
        case "login/SET-ERROR-MESSAGE": {
            return {...state, error: action.error}
        }
        default: {
            return state;
        }
    }
}

//AC
export const loginAC = (value: boolean) => (
    {type: "login/SET-IS-LOGGED-IN", value} as const
)
export const setStatusProgressAC = (progress: RequestStatusType) => (
    {type: "login/SET-STATUS-PROGRESS", progress} as const
)
export const setErrorMessageAC = (error: RequestStatusType) => (
    {type: "login/SET-ERROR-MESSAGE", error} as const
)


//TC
export const LoginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setStatusProgressAC("loading"));
    authAPI.login(data)
        .then(res => {
            dispatch(loginAC(true))
            dispatch(setProfileDataAC(res.data))
            dispatch(setStatusProgressAC("succeeded"))

        })
        .catch(e => {
            dispatch(setErrorMessageAC(e.response.data.error))
            dispatch(setStatusProgressAC("failed"))
        })
}


//TYPES
const InitialStateLogin = {
    isAuth: false,
    progress: "idle" as RequestStatusType,
    error: null as string | null
}

export type InitialStateLoginType = typeof InitialStateLogin;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export default loginReducer;