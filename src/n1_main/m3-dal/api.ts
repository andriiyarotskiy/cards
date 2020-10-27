import axios from 'axios';

// http://localhost:7542/2.0/  => local back

// https://neko-back.herokuapp.com/2.0/  => remote back

const settings = {
    withCredentials: true,
}

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    ...settings,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseLoginType>("auth/login", data);
    },
    registration(data: RegistrationDataType) {
        return instance.post("auth/register", data);
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post<ResponseForgotType>("auth/forgot", data);
    },
    changePassword(data: ChangePasswordType) {
        return instance.post("auth/set-new-password", data)
    },
    authMe() {
        return instance.post<ResponseLoginType>("auth/me", {});
    },
    logOut() {
        return instance.delete("auth/me", {});
    },
}
//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}
export type ChangePasswordType = {
    password: string
    resetPasswordToken: string
}

export type ResponseLoginType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
}

export type ResponseForgotType = {
    info: string
    error: string
}

export type RegistrationDataType = {
    email: string
    password: string
    repeatPassword?: string // not necessarily
}