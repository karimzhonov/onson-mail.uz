import type { Hotel } from "./hotel"
import type { Region } from "./region"


export interface Food {
    code: string
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
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

export interface Type {
    id: number
    name: string
    name_uz: string
    name_ru: string
    description: string
    description_uz: string
    description_ru: string
}

interface Image {
    id: number
    image: string
}

interface Day {
    id: number
    day: number
    title: string
    title_uz: string
    title_ru: string
    desc: string
    desc_uz: string
    desc_ru: string
    image: string
    region: Region
    hotel: Hotel
}

interface Price {
    id: number
    name: string
    name_uz: string
    name_ru: string
    price_b2b: boolean
    price_b2c: boolean
}

export interface Tour {
    id: number
    days?: Day[]
    prices?: Price[]
    type: Type[]
    title: string
    title_uz: string
    title_ru: string
    description: string
    description_uz: string
    description_ru: string
    from_date: string
    to_date: string
    from_day: number
    hot_tour: boolean
    best_proposal: boolean
    min_price_b2b: number
    min_price_b2c: number
    images: Image[]
    services?: Service[]
    food?: Food
    with_flight?: boolean
    from_country: number
    to_country: number
}
