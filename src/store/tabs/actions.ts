import { createStandardAction } from 'typesafe-actions'
import { Tab, ActionTypes } from './types'

export const getAllTabs = {
    request: createStandardAction(ActionTypes.API_GETALL_REQUEST)(),
    response: createStandardAction(ActionTypes.API_GETALL_RESPONSE)<Tab[]>()
}

export const failure = createStandardAction(ActionTypes.API_ERROR)<Error>()