export const RECENT_PHOTO_KEY = "RECENT_PHOTO_KEY"

export interface IPhoto {
    id: string;
    url: string;
}

export interface IPhotos {
    photos: IPhoto[]
}