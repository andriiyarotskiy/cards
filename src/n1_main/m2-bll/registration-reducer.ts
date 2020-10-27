import {ActionTypes} from "./store";
import {Dispatch} from "redux";
import {authAPI, RegistrationDataType} from "../m3-dal/api";

export type InitialStateType = typeof InitialState;
export type RequestStatusType = 'idle' | 'loading'
const InitialState = {
    isLoggedIn: false,
    error: null as string | null,
    loaderStatus: 'idle' as RequestStatusType
}

const registrationReducer = (state: InitialStateType = InitialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: true}
        }
        case "SET-ERROR-REGISTRATION": {
            return {...state, error: action.error}
        }
        case "SET-REQUEST-STATUS": {
            return {...state, loaderStatus: action.loaderStatus}
        }
        default: {
            return state
        }
    }
}
export const setIsLoggedIn = () => (
    {type: "SET-IS-LOGGED-IN"} as const
)
export const setErrorRegistration = (error: string | null) => (
    {type: "SET-ERROR-REGISTRATION", error} as const
)
export const requestStatus = (loaderStatus: RequestStatusType) => (
    {type: "SET-REQUEST-STATUS", loaderStatus} as const
)


//THUNK

export const registrationTC = (data: RegistrationDataType) => async (dispatch: Dispatch) => {
    dispatch(requestStatus('loading'))
    try {
        await authAPI.registration(data)
        dispatch(setIsLoggedIn())
    } catch (e) {
        dispatch(setErrorRegistration(e.response.data.error))
    }
    finally {
        dispatch(requestStatus('idle'))
    }
}

export default registrationReducer;