import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'
import { State } from './types'
import * as actions from './actions'

export const initialState: State = {
    loading: false,
    operations: []
}

type Actions = ActionType<typeof actions>

const reducer: Reducer<State> = (state = initialState, action: Actions) => {
    switch (action.type) {
        // API
        case getType(actions.getAll.request):
            return { ...state, loading: true }
        case getType(actions.getAll.response):
            return { ...state, loading: false, operations: action.payload }
        case getType(actions.failure):
            return { ...state, loading: false }
        // UI
        // case getType(actions.editOpen):
        //     return { ...state, editing: action.payload }

        default:
            return state
    }
}

export { reducer as operationsReducer }