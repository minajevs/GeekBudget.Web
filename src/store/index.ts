import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'

import { State as TabsState } from 'store/tabs/types'
import { tabsReducer, initialState as tabsInitialState } from 'store/tabs/reducer'

import { State as ErrorsState } from 'store/errors/types'
import { errorsReducer, initialState as errorsInitialState } from 'store/errors/reducer'

export const initialState: ApplicationState = {
    errors: errorsInitialState,
    tabs: tabsInitialState
}

export interface ApplicationState {
    errors: ErrorsState,
    tabs: TabsState,
}

export const rootReducer = combineReducers<ApplicationState>({
    errors: errorsReducer,
    tabs: tabsReducer,
})

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}