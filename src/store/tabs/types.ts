export interface Tab {
    id: number;
    name: string;
    amount: number;
    currency: string;
}

export const enum ActionTypes {
    API_GETALL_REQUEST = '@@tabs/api/REQUEST_ALL',
    API_GETALL_RESPONSE = '@@tabs/api/REQUEST_ALL',

    API_GET_REQUEST = '@@tabs/api/REQUEST_ALL',
    API_GET_RESPONSE = '@@tabs/api/REQUEST_ALL',

    API_REMOVE_REQUEST = '@@tabs/api/REQUEST_ALL',
    API_REMOVE_RESPONSE = '@@tabs/api/REQUEST_ALL',

    API_EDIT_REQUEST = '@@tabs/api/REQUEST_ALL',
    API_EDIT_RESPONSE  = '@@tabs/api/REQUEST_ALL',

    API_ERROR = '@@tabs/api/error',
}

export interface TabsState{
    readonly tabs: Tab[]
}