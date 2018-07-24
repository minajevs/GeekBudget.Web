import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'

// import { TabsState } from 'store/tabs/types'
// import { tabsReducers } from 'store/tabs/reducers'

import { State as ErrorsState } from 'store/errors/types'
import { errorsReducer, initialState as errorsInitialState } from 'store/errors/reducer'

export const initialState: ApplicationState = {
    errors: errorsInitialState
}

export interface ApplicationState {
    errors: ErrorsState,
    // tabs: TabsState
}

export const rootReducer = combineReducers<ApplicationState>({
    errors: errorsReducer,
    // tabs: tabsReducers,
})

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}