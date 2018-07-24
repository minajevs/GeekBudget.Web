export interface Error {
    code: number
    text: string
    data?: object
}

export const enum ActionTypes {
    THROW = '@@errors/THROW',
    DISMISS = '@@errors/DISMISS',
}

export interface State{
    readonly error?: Error
    readonly log: Error[]
}