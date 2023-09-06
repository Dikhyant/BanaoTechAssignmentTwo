import axios, { AxiosResponse } from "axios";
import { IPhoto as IPhotoFromStore, IStore } from "../redux/store/store"
import { FLICKR_GET_RECENT_PHOTO_API_URL } from "./constants";
import { IPhotosFlickr } from "../interfaces/flickr/IPhotosFlickr";
import savePhotosToAsyncStorage from "../utils/asyncStorage/savePhotosToAsyncStorage";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { addRecentPhotos } from "../redux/actions/photo";

type Proptype = {
    dispatch: Dispatch<AnyAction>
    onSucess?: (response: AxiosResponse<any, any>) => void
    onFailure?: (error: any) => void
}

const fetchRecentPhotosAndLoadIntoStore = ({dispatch, onSucess, onFailure}: Proptype) => {
    const photos: IPhotoFromStore[] = new Array<IPhotoFromStore>();
        
    axios.get(FLICKR_GET_RECENT_PHOTO_API_URL)
    .then(response => {
        const result: IPhotosFlickr = response.data as IPhotosFlickr

        for(let i = 0; i < result.photos.photo.length; i++) {
            photos.push({
                id: result.photos.photo[i].id,
                url: result.photos.photo[i].url_s,
            })
        }

        savePhotosToAsyncStorage({
            photos: photos
        })

        dispatch(addRecentPhotos({
            photos: photos
        }))

        if(onSucess) onSucess(response)
    })
    .catch(error => {
        if(onFailure) onFailure(error)
    })
}

export default fetchRecentPhotosAndLoadIntoStore