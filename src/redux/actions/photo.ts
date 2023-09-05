import { ADD_RECENT_PHOTO } from "../actionTypes/photo";
import { IPhoto as IPhotoFromStore } from "../store/store";

export interface IAction {
    type: string;
}

export interface IPhotos extends IAction {
    photos: IPhotoFromStore[]
}

type addRecentPhotosProp = {
    photos: IPhotoFromStore[]
}

export const addRecentPhotos = (data: addRecentPhotosProp):IPhotos => {
    return ({
        type: ADD_RECENT_PHOTO,
        photos: data.photos
    })
}