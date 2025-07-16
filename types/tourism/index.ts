import type { Translations } from ".."
import type { Hotel } from "./hotel"
import type { Region } from "./region"


export interface Food extends Translations {
    code: string
}

export interface Service extends Translations {
    id: number
}

export interface Type extends Translations {
    id: number
}

interface Image {
    id: number
    image: string
}

interface Day extends Translations {
    id: number
    day: number
    image: string
    region: Region
    hotel?: Hotel
}

interface Price extends Translations {
    id: number
    price_b2b: boolean
    price_b2c: boolean
}

export interface Tour extends Translations {
    id: number
    days?: Day[]
    prices?: Price[]
    type: Type[]
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
