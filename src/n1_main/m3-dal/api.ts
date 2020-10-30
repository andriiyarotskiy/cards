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


export const cardsPackAPI = {
    getPackCards(packName: string = '', min: number = 3, max: number = 9,
                 sortPacks: string = 'updated', page: number = 1,
                 pageCount: number = 10, user_id: string = '') {
        return instance.get<ResponseCommon>(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${user_id}`)
    },
    deletedPackCards(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    newPackCards(name: string = "no Name", path: string = "/def", grade: number = 0,
                 shots: number = 0, rating: number = 0, deckCover: string = "",  type: string = "pack") {
        return instance.post(`cards/pack`, {name,path,grade,shots,rating,deckCover,type})
    }
}



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

export type ResponseCommon = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardsPackType = {
    _id: string
    user_id: string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
}

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