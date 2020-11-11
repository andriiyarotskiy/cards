import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import profileReducer, {isInitializedAC, setProfileDataAC} from "./profile-reducer";
import loginReducer, {loginAC, setErrorMessageAC, setStatusProgressAC} from "./login-reducer";
import registrationReducer, {requestStatus, setErrorRegistration, setIsLoggedIn} from "./registration-reducer";
import changePasswordReducer, {isCorrectPassword, setPasswordAC} from "./changePassword-reducer";
import forgotPasswordReducer, {forgotPasswordAC} from "./forgotPassword-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    changePassword: changePasswordReducer,
    forgotPassword: forgotPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionTypes =
    //profile
    ReturnType<typeof setProfileDataAC> |
    ReturnType<typeof isInitializedAC> |
    //login
    ReturnType<typeof loginAC> |
    ReturnType<typeof setErrorMessageAC> |
    ReturnType<typeof setStatusProgressAC> |

    //registration
    ReturnType<typeof setIsLoggedIn> |
    ReturnType<typeof setErrorRegistration> |
    ReturnType<typeof requestStatus> |

    //changePassword
    ReturnType<typeof setPasswordAC> |
    ReturnType<typeof isCorrectPassword> |
    //forgotPassword
    ReturnType<typeof forgotPasswordAC>


// @ts-ignore
window.store = store