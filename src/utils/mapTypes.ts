export type MappedPartial<T> = {
    [P in keyof T]?: T[P]
}