import React, {useEffect} from 'react'
import style from './TableCardsPack.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deletePackCardsTC, GetCardsPackTC} from "../../../m2-bll/cardsPack-reducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardsPackType} from "../../../m3-dal/api";


export const TableCardsPack = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        debugger
        dispatch(GetCardsPackTC())
    }, [])

    const kek = (id: string) => {
        dispatch(deletePackCardsTC(id))
    }

    const packs = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.cardsPack.cardsPacks)
    return (
        <div>
            {packs.map(el => {
                return (
                    <div key={el._id} className={style.wrapper}>
                        <div>{el.name}</div>
                        <div>{el.updated}</div>
                        <button onClick={() => kek(el._id)}>Удаление</button>
                        <button>-</button>
                        <button>edit</button>
                    </div>
                )
            })}
        </div>
    )
}