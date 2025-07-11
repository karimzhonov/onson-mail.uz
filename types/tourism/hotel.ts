import type { Region } from "./region"
import type { Food } from "."

export interface HotelType {
    id: number
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}

export interface HotelRoomType { 
    id: string
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}

export interface HotelServiceType { 
    id: string
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}

interface HotelFood {
    id: number
    food: Food
    price_b2b: number
    price_b2c: number
}

interface HotelRoom {
    id: number
    room: HotelRoomType
    price_b2b: number
    price_b2c: number
    free_rooms: number
}

interface HotelService {
    id: number
    service: HotelServiceType
    price_b2b: number
    price_b2c: number
}

interface HotelImage {
    id: number
    image: string
}

export interface Hotel {
    id: number
    type: HotelType
    region: Region
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
    stars: number
    hotelfood_set: HotelFood[]
    hotelroom_set: HotelRoom[]
    hotelservice_set: HotelService[]
    hotelimage_set: HotelImage[]

}

export interface Service {
    id: number
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}

export interface Room {
    id: number
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}