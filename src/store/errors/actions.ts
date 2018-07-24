import { action, createAction, createStandardAction } from 'typesafe-actions'

import { ActionTypes, Error } from './types'

export const throwError = createStandardAction(ActionTypes.THROW)<Error>()
export const dismissError = createStandardAction(ActionTypes.DISMISS)()