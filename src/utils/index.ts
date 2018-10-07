import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action, Dispatch } from 'redux'
import 'reflect-metadata'

export type PayloadCallback<State, Actions extends AnyAction, Payload = undefined> = (
    dispatch: ThunkDispatch<State, undefined, Actions>,
    payload: Payload /*, getState: () => State */
) => Promise<Action>

export type Callback<State, Actions extends AnyAction> = (
    dispatch: ThunkDispatch<State, undefined, Actions> /*, getState: () => State */
) => Promise<Action>

type UnionCallback<State, Actions extends AnyAction, Payload> =
    PayloadCallback<State, Actions, Payload>

export function createThunk<State, Actions extends AnyAction, Payload = undefined>(
    callback: UnionCallback<State, Actions, Payload>
) {
    // unfortunately, we can't specify Payload generic type as optional yet, 
    // because typescript handles undefined and missing differently
    // refer to https://github.com/Microsoft/TypeScript/issues/12400
    // it will be possible to make payload parameter optional / mandatory depending on it's type
    // but not now....
    return function (payload?: Payload): ThunkAction<Promise<Action>, State, undefined, Actions> {
        if (payload)
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) =>
                (callback as PayloadCallback<State, Actions, Payload>)(dispatch, payload /*, getState */)
        else
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) =>
                (callback as Callback<State, Actions>)(dispatch /*, getState */)
    }
}