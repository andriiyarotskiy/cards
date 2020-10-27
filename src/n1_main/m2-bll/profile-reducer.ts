import {ActionTypes} from "./store";
import {authAPI, ResponseLoginType} from "../m3-dal/api";
import {Dispatch} from "redux";
import {loginAC} from "./login-reducer";

type InitialStateType = typeof InitialState;

const InitialState = {
    userData: {
        email: '',
        name: '',
    },
    isInitialized: true
}

const profileReducer = (state: InitialStateType = InitialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET-PROFILE-DATA": {
            return {...state, userData: action.userData}
        }
        case "USER-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        default: {
            return state
        }
    }
}
export const setProfileDataAC = (userData: ResponseLoginType) => (
    {type: "SET-PROFILE-DATA", userData} as const
)
export const isInitializedAC = (isInitialized: boolean) => (
    {type: "USER-INITIALIZED", isInitialized} as const
)

export const authMeTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(isInitializedAC(true))
        const res = await authAPI.authMe()
        dispatch(setProfileDataAC(res.data))

        dispatch(loginAC(true))
    } catch (e) {
        console.log(e.response.data.error) // message => user not authorized
    }
    dispatch(isInitializedAC(false))
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(isInitializedAC(true))
        const res = await authAPI.logOut()
        console.log(res.data.info)
        dispatch(loginAC(false))
    } catch (e) {
        console.log(e.response.data.error)
    }
    dispatch(isInitializedAC(false))
}


export default profileReducer;