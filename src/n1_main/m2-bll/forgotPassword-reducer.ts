import {ActionTypes} from "./store";
import {authAPI, ForgotPasswordType} from "../m3-dal/api";
import {Dispatch} from "redux";
import {setStatusProgressAC} from "./login-reducer";


const forgotPasswordReducer = (state: InitialStateType = InitialState, action: ActionTypes) => {
    switch (action.type) {
        case "FORGOT-PASSWORD": {
            return {...state, email: action.value}
        }
        default: {
            return state;
        }
    }
}

//AC
export const forgotPasswordAC = (value: string) => {
    return {type: "FORGOT-PASSWORD", value} as const;
}


//TC
export const forgotPasswordTC = (data: ForgotPasswordType) => (dispatch: Dispatch) => {
    dispatch(setStatusProgressAC("loading"));
    authAPI.forgotPassword(data)
        .then(res => {
                console.log(res.data.info)
                dispatch(setStatusProgressAC("succeeded"))
            }
        )
        .catch(error => {
                console.log(error)
                dispatch(setStatusProgressAC("failed"))
            }
        )
}


//TYPES
const InitialState = {
    email: ""
}

export type InitialStateType = typeof InitialState;

export default forgotPasswordReducer;