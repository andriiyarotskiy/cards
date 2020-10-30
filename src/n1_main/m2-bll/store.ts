import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import profileReducer, {isInitializedAC, setProfileDataAC} from "./profile-reducer";
import loginReducer, {loginAC, setStatusProgressAC} from "./login-reducer";
import registrationReducer, {requestStatus, setErrorRegistration, setIsLoggedIn} from "./registration-reducer";
import changePasswordReducer, {isCorrectPassword, setPasswordAC} from "./changePassword-reducer";
import forgotPasswordReducer, {forgotPasswordAC} from "./forgotPassword-reducer";
import {cardsPackReducer, setPacksCardsAC} from "./cardsPack-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    changePassword: changePasswordReducer,
    forgotPassword: forgotPasswordReducer,
    cardsPack: cardsPackReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionTypes = |
    ReturnType<typeof setProfileDataAC> |
    ReturnType<typeof isInitializedAC> |
    ReturnType<typeof loginAC> |
    ReturnType<typeof setIsLoggedIn> |
    ReturnType<typeof setErrorRegistration> |
    ReturnType<typeof requestStatus> |
    ReturnType<typeof setStatusProgressAC> |
    ReturnType<typeof forgotPasswordAC> |
    ReturnType<typeof setPasswordAC> |
    ReturnType<typeof isCorrectPassword> |
    ReturnType<typeof setPacksCardsAC>


// @ts-ignore
window.store = store