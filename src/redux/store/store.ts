import {
    configureStore
} from "@reduxjs/toolkit"
import { rootReducer } from "../reducers/rootReducer"

export interface IStore {
    recentPhotos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string
}

const store = configureStore({
    reducer: rootReducer
})

export default store;