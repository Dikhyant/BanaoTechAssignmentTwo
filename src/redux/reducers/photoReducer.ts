import { ADD_RECENT_PHOTO } from "../actionTypes/photo";
import { IAction, IPhotos } from "../actions/photo";
import { IPhoto as IPhotoFromStore, IStore } from "../store/store";

export const photoReducer = (store: IStore = {
    recentPhotos: new Array<IPhotoFromStore>()
}, action: IAction):IStore => {
    switch (action.type) {
        case ADD_RECENT_PHOTO:
            return {
                ...store,
                recentPhotos: (action as IPhotos).photos
            }

        default:
            return store
    }
}