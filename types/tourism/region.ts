import type { Translations } from ".."

export interface Country extends Translations {
    id: number
    can_from: boolean
    can_to: boolean
    active: boolean
}


export interface Region extends Translations {
    id: number
    can_from: boolean
    can_to: boolean
    active: boolean
    country: Country
}