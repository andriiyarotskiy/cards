import {Dispatch} from "redux";
import {cardsPackAPI, ResponseCommon} from "../m3-dal/api";
import {ActionTypes} from "./store";

const initialState = {
    cardsPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            path: '',
            grade: 0,
            shots: 0,
            rating: 0,
            type: '',
            created: '',
            updated: ''
        }
    ],
    cardPacksTotalCount: 24,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}

export type InitialStatePacksType = typeof initialState

export const cardsPackReducer = (state: InitialStatePacksType = initialState, action: ActionTypes): InitialStatePacksType => {
    switch (action.type) {
        case "SET-PACKS-CARDS": {
            debugger
            return {
                ...state,
                ...action.data,
                cardsPacks: action.data.cardPacks.map(el => ({...el}))
            }
        }
        default:
            return state
    }
}


export const setPacksCardsAC = (data: ResponseCommon) => ({type: 'SET-PACKS-CARDS', data} as const)


export const GetCardsPackTC = () => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        const res = await cardsPackAPI.getPackCards()
        dispatch(setPacksCardsAC(res.data))
    } catch (error) {
        console.dir(error)
    }
}

export const deletePackCardsTC = (id:string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        const res = await cardsPackAPI.deletedPackCards(id)
        dispatch(setPacksCardsAC(res.data))
    }catch (error){
        console.dir(error)
    }
}