export interface Operation {
    id: number
    comment: string
    amount: number
    currency: string
    from: number
    to: number
    date: Date
}

export const enum ActionTypes {
    API_GETALL_REQUEST = '@@operations/api/getall/REQUEST',
    API_GETALL_RESPONSE = '@@operations/api/getall/RESPONSE',

    API_GET_REQUEST = '@@operations/api/get/REQUEST',
    API_GET_RESPONSE = '@@operations/api/get/RESPONSE',

    API_ADD_REQUEST = '@@operations/api/add/REQUEST',
    API_ADD_RESPONSE = '@@operations/api/add/RESPONSE',

    API_REMOVE_REQUEST = '@@operations/api/remove/REQUEST',
    API_REMOVE_RESPONSE = '@@operations/api/remove/RESPONSE',

    API_UPDATE_REQUEST = '@@operations/api/update/REQUEST',
    API_UPDATE_RESPONSE = '@@operations/api/update/RESPONSE',

    API_ERROR = '@@operations/api/FAILURE',

    // UI_EDIT_OPEN = '@@tabs/ui/edit/open',
}

export interface State {
    readonly loading: boolean
    readonly operations: Operation[]
}