import type { Region } from "./region"
import type { Food } from "."
import type { Translations } from ".."

export interface HotelType extends Translations {
    id: number
}

export interface HotelRoomType extends Translations { 
    id: string
}

export interface HotelServiceType extends Translations { 
    id: string
}

export interface HotelFood {
    id: number
    food: Food
    price_b2b: number
    price_b2c: number
}

export interface HotelRoom extends Translations {
    id: number
    room: HotelRoomType
    price_b2b: number
    price_b2c: number
    free_rooms: number
    image?: string
}

export interface HotelService {
    id: number
    service: HotelServiceType
    price_b2b: number
    price_b2c: number
}

interface HotelImage {
    id: number
    image: string
}

export interface Hotel extends Translations {
    id: number
    type: HotelType
    region: Region
    stars: number
    hotelfood_set: HotelFood[]
    hotelroom_set: HotelRoom[]
    hotelservice_set: HotelService[]
    hotelimage_set: HotelImage[]
    min_price_b2b: number
    min_price_b2c: number
}

export interface Service extends Translations {
    id: number
}

export interface Room extends Translations {
    id: number
}

export interface HotelRoomCalendar {
    date: string
    room: number
    value: number
}