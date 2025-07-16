export interface LimitOffsetPagination<T> {
    limit: number
    offset: number
    results: T[]
    count: number
}

export interface Translations {
    name: string
    description: string
    desc: string
    title: string

    name_uz: string
    description_uz: string
    desc_uz: string
    title_uz: string

    name_ru: string
    description_ru: string
    desc_ru: string
    title_ru: string

    name_en: string
    description_en: string
    desc_en: string
    title_en: string
}
