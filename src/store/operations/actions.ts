import { createStandardAction } from 'typesafe-actions'
import { Operation, ActionTypes } from './types'
import { InternalError } from 'store/errors/types'

// API

export const getAll = {
    request: createStandardAction(ActionTypes.API_GETALL_REQUEST)(),
    response: createStandardAction(ActionTypes.API_GETALL_RESPONSE)<Operation[]>()
}

export const get = {
    request: createStandardAction(ActionTypes.API_GET_REQUEST)<number>(),
    response: createStandardAction(ActionTypes.API_GET_RESPONSE)<Operation>()
}

export const add = {
    request: createStandardAction(ActionTypes.API_ADD_REQUEST)<Operation>(),
    response: createStandardAction(ActionTypes.API_ADD_RESPONSE)<number>()
}

export const remove = {
    request: createStandardAction(ActionTypes.API_REMOVE_REQUEST)<number>(),
    response: createStandardAction(ActionTypes.API_REMOVE_RESPONSE)()
}

export const update = {
    request: createStandardAction(ActionTypes.API_UPDATE_REQUEST)<{ id: number, operation: Operation }>(),
    response: createStandardAction(ActionTypes.API_UPDATE_RESPONSE)()
}

export const failure = createStandardAction(ActionTypes.API_ERROR)<InternalError>()

// UI

// export const editOpen = createStandardAction(ActionTypes.UI_EDIT_OPEN)<number>()