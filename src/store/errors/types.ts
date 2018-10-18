export interface InternalError {
    code: number
    text: string
    innerError?: Error
    data?: object
}

export const enum ActionTypes {
    THROW = '@@errors/THROW',
    DISMISS = '@@errors/DISMISS',
}

export interface State {
    readonly error?: InternalError
    readonly log: InternalError[]
}