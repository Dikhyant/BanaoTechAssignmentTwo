export interface IPhotosFlickr {
    page: number;
    pages: number;
    perpage: number;
    photo: IPhoto[];
    total: number;
    stat: string;
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