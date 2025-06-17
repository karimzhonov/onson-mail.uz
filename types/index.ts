export interface LimitOffsetPagination<T> {
    limit: number
    offset: number
    results: T[]
    count: number
}
