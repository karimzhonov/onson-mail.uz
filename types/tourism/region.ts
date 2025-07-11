export interface Country {
    id: number
    name: string
    name_uz: string
    name_ru: string
    can_from: boolean
    can_to: boolean
    active: boolean
}


export interface Region {
    id: number
    name: string
    name_uz: string
    name_ru: string
    can_from: boolean
    can_to: boolean
    active: boolean
    country: Country
}