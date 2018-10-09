export interface Tab {
    id: number
    type?: number
    name: string
    amount: number
    currency: string
}

export const enum ActionTypes {
    // API
    API_GETALL_REQUEST = '@@tabs/api/getall/REQUEST',
    API_GETALL_RESPONSE = '@@tabs/api/getall/RESPONSE',

    API_GET_REQUEST = '@@tabs/api/get/REQUEST',
    API_GET_RESPONSE = '@@tabs/api/get/RESPONSE',

    API_ADD_REQUEST = '@@tabs/api/add/REQUEST',
    API_ADD_RESPONSE = '@@tabs/api/add/RESPONSE',

    API_REMOVE_REQUEST = '@@tabs/api/remove/REQUEST',
    API_REMOVE_RESPONSE = '@@tabs/api/remove/RESPONSE',

    API_UPDATE_REQUEST = '@@tabs/api/update/REQUEST',
    API_UPDATE_RESPONSE = '@@tabs/api/update/RESPONSE',

    API_ERROR = '@@tabs/api/FAILURE',

    // UI
    UI_ADD_OPEN = '@@tabs/ui/add/open',
    UI_ADD_CLOSE = '@@tabs/ui/add/close',
}

export interface State {
    readonly loading: boolean
    readonly editing?: number
    readonly addOpen: boolean
    readonly tabs: Tab[]
}