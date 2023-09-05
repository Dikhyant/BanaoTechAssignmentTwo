export interface IPhotosFlickr {
    photos: IPhotos;
    stat: string;
}

export interface IPhotos {
    page: number;
    pages: number;
    perpage: number;
    photo: IPhoto[];
    total: number;
}

export interface IPhoto {
    farm: number;
    height: number;
    id: string;
    isfamily: boolean;
    isfriend: boolean;
    ispublic: boolean;
    owner: string;
    secret: string;
    server: string;
    title: string;
    url_s: string;
    width_s: number;
}