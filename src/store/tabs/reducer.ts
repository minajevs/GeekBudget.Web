import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'
import { State } from './types'
import * as actions from './actions'

export const initialState: State = {
    loading: false,
    tabs: []
}

type Actions = ActionType<typeof actions>

const reducer: Reducer<State> = (state = initialState, action: Actions ) => {
    switch (action.type) {
        case getType(actions.getAllTabs.request):
            return { ...state, loading: true }
        case getType(actions.getAllTabs.response):
            return { ...state, loading: false, tabs: action.payload }

        case getType(actions.failure):
            return { ...state, loading: false }

        default: 
            return state
    }
}

export { reducer as tabsReducer }