import { createStandardAction } from 'typesafe-actions'

import { ActionTypes, InternalMenuItem } from './types'

export const open = createStandardAction(ActionTypes.OPEN)<HTMLElement>()
export const close = createStandardAction(ActionTypes.CLOSE)()