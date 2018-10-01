import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'
import { State } from './types'
import * as actions from './actions'
import menuItems from './menuItems'

export const initialState: State = {
    open: false,
    anchor: null,
    items: menuItems,
}

type Actions = ActionType<typeof actions>

const reducer: Reducer<State> = (state = initialState, action: Actions) => {
    switch (action.type) {
        case getType(actions.open):
            return {
                ...state,
                anchor: action.payload,
                open: true
            }

        case getType(actions.close):
            return {
                ...state,
                open: false
            }

        default:
            return state;
    }
}

export { reducer as menuReducer }