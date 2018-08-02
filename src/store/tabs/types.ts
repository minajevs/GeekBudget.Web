export interface Tab {
    id: number
    name: string
    amount: number
    currency: string
}

export const enum ActionTypes {
    API_GETALL_REQUEST = '@@tabs/api/getall/REQUEST',
    API_GETALL_RESPONSE = '@@tabs/api/getall/RESPONSE',

    API_GET_REQUEST = '@@tabs/api/get/REQUEST',
    API_GET_RESPONSE = '@@tabs/api/get/RESPONSE',

    API_REMOVE_REQUEST = '@@tabs/api/remove/REQUEST',
    API_REMOVE_RESPONSE = '@@tabs/api/remove/RESPONSE',

    API_EDIT_REQUEST = '@@tabs/api/edit/REQUEST',
    API_EDIT_RESPONSE  = '@@tabs/api/edit/RESPONSE',

    API_ERROR = '@@tabs/api/FAILURE',
}

export interface State{
    readonly loading: boolean
    readonly tabs: Tab[]
}