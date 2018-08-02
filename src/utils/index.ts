import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action, Dispatch } from 'redux'

type PayloadCallback<State, Actions extends AnyAction, Payload> = (
    dispatch: ThunkDispatch<State, undefined, Actions>, 
    payload: Payload /*, getState: () => State */
) => Promise<Action>

type Callback<State, Actions extends AnyAction> = (
    dispatch: ThunkDispatch<State, undefined, Actions> /*, getState: () => State */
) => Promise<Action>
 
export function createThunk<State, Actions extends AnyAction, Payload = undefined>(
    callback: Callback<State, Actions> | PayloadCallback<State, Actions, Payload>
) {
    return function(payload?: Payload): ThunkAction<Promise<Action>, State, undefined, Actions> { 
        if (payload !== undefined)
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) => 
                (callback as PayloadCallback<State, Actions, Payload>)(dispatch, payload /*, getState */)
        else
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) =>
                (callback as Callback<State, Actions>)(dispatch /*, getState */)
    }
}