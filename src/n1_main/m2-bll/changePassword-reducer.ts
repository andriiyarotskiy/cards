import {ActionTypes} from "./store";
import {authAPI, ChangePasswordType} from "../m3-dal/api";
import {Dispatch} from "redux";
import {setStatusProgressAC} from "./login-reducer";


const InitialState = {
    password: "",
    setPassword: false,
    isCorrectPass: false
}

const changePasswordReducer = (state: InitialStateType = InitialState, action: ActionTypes) => {
    switch (action.type) {
        // case "CHANGE-PASSWORD": {
        //     return {...state, password: action.value}
        // }
        case "SET-PASSWORD": {
            return {...state, setPassword: action.isSet}
        }
        case "IS-CORRECT-PASSWORD": {
            return {...state, isCorrectPass: action.isCorrect}
        }
        default: {
            return state
        }
    }
}

//AC
export const setPasswordAC = (isSet: boolean) => (
    {type: "SET-PASSWORD", isSet} as const
)
export const isCorrectPassword = (isCorrect: boolean) => (
    {type: "IS-CORRECT-PASSWORD", isCorrect} as const
)

//TC
export const changePasswordTC = (data: ChangePasswordType) => (dispatch: Dispatch) => {
    dispatch(setStatusProgressAC("loading"));
    dispatch(isCorrectPassword(true)); // дизейблит кнопку если пошол запрос
    authAPI.changePassword(data)
        .then(res => {
            console.log(res.data)
            dispatch(setPasswordAC(true))
            dispatch(isCorrectPassword(false)); // роздизейбл кнопки если ОК
            dispatch(setStatusProgressAC("succeeded"))
        })
        .catch(error => {
                dispatch(setStatusProgressAC("failed"))
                console.log(error)
            }
        )
}

//TYPES
export type InitialStateType = typeof InitialState;


export default changePasswordReducer;