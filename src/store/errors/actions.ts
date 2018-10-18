import { createStandardAction } from 'typesafe-actions'

import { ActionTypes, InternalError } from './types'

export const throwError = createStandardAction(ActionTypes.THROW)<InternalError>()
export const dismissError = createStandardAction(ActionTypes.DISMISS)()