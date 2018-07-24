import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'
import { State } from './types'
import * as actions from './actions'

export const initialState: State = {
    error: undefined,
    log: []
}

type Actions = ActionType<typeof actions>

const reducer: Reducer<State> = (state = initialState, action: Actions ) => {
    switch (action.type) {
        case getType(actions.throwError): 
            return { ...state, 
                error: action.payload, 
                log: state.error === undefined 
                    ? state.log 
                    : [state.error, ...state.log] 
                }

        case getType(actions.dismissError): 
            return { ...state,
                error: undefined,
                log: state.error === undefined 
                    ? state.log 
                    : [state.error, ...state.log]  
                }

        default: 
            return state;
    }
}

export { reducer as errorsReducer }