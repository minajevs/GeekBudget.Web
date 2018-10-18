import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'
import { State } from './types'
import * as actions from './actions'

export const initialState: State = {
    loading: false,
    editTab: null,
    addOpen: false,
    tabs: []
}

type Actions = ActionType<typeof actions>

const reducer: Reducer<State> = (state = initialState, action: Actions) => {
    switch (action.type) {
        // API
        case getType(actions.getAll.request):
            return { ...state, loading: true }
        case getType(actions.getAll.response):
            return { ...state, loading: false, tabs: action.payload }
        case getType(actions.failure):
            return { ...state, loading: false }
        // UI
        case getType(actions.addOpen):
            return { ...state, addOpen: true }
        case getType(actions.addClose):
            return { ...state, addOpen: false }
        case getType(actions.editOpen):
            return { ...state, editTab: action.payload }
        case getType(actions.editClose):
            return { ...state, editTab: null }
            
        default:
            return state
    }
}

export { reducer as tabsReducer }