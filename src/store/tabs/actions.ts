import { createStandardAction } from 'typesafe-actions'
import { Tab, ActionTypes } from 'store/tabs/types'
import { Error } from 'store/errors/types'

// API

export const getAll = {
    request: createStandardAction(ActionTypes.API_GETALL_REQUEST)(),
    response: createStandardAction(ActionTypes.API_GETALL_RESPONSE)<Tab[]>()
}

export const get = {
    request: createStandardAction(ActionTypes.API_GET_REQUEST)<number>(),
    response: createStandardAction(ActionTypes.API_GET_RESPONSE)<Tab>()
}

export const add = {
    request: createStandardAction(ActionTypes.API_ADD_REQUEST)<Tab>(),
    response: createStandardAction(ActionTypes.API_ADD_RESPONSE)<number>()
}

export const remove = {
    request: createStandardAction(ActionTypes.API_REMOVE_REQUEST)<number>(),
    response: createStandardAction(ActionTypes.API_REMOVE_RESPONSE)()
}

export const update = {
    request: createStandardAction(ActionTypes.API_UPDATE_REQUEST)<{ id: number, tab: Tab }>(),
    response: createStandardAction(ActionTypes.API_UPDATE_RESPONSE)()
}

export const failure = createStandardAction(ActionTypes.API_ERROR)<Error>()

// UI

export const addOpen = createStandardAction(ActionTypes.UI_ADD_OPEN)()
export const addClose = createStandardAction(ActionTypes.UI_ADD_CLOSE)()