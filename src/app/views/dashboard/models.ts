import { GoogleMap } from "@angular/google-maps";

export interface FoodTruck {
    locationId?: number;
    Applicant:string;
    block?: string;
    lot?: string;
    address?: string;
    latitude: number;
    longitude: number;
    foodItems: string;
}

export interface MapInfo {
    position: Possition;
    title: string;
    label: {
        color: string,
        text: string
    },
    options: {
        animation: google.maps.Animation
    }
}

export interface Possition {
    lat: any;
    lng: any;
}