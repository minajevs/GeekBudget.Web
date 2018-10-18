import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action, Dispatch } from 'redux'

export type PayloadCallback<State, Actions extends AnyAction, Payload> = (
    dispatch: ThunkDispatch<State, undefined, Actions>,
    payload: Payload /*, getState: () => State */
) => Promise<Action>

export type Callback<State, Actions extends AnyAction> = (
    dispatch: ThunkDispatch<State, undefined, Actions> /*, getState: () => State */
) => Promise<Action>

type UnionCallback<State, Actions extends AnyAction, Payload> =
    Payload extends undefined
    ? Callback<State, Actions>
    : PayloadCallback<State, Actions, Payload> 

// HACK to implement optional function argument. 
// Read more: https://github.com/Microsoft/TypeScript/issues/12400
type OptionalSpread<T> =
    T extends undefined
    ? []
    : [T]

function isPayload<Payload = undefined>(
    payload: Payload
): payload is Payload {
    return typeof payload !== 'undefined'
}

export function createThunk<State, Actions extends AnyAction, Payload = undefined>(
    callback: UnionCallback<State, Actions, Payload>
): (...args: OptionalSpread<Payload>) => ThunkAction<Promise<Action>, State, undefined, Actions> {
    return (...args: OptionalSpread<Payload>) => {
        const payload = args[0]
        if (isPayload(payload))
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) =>
                (callback as PayloadCallback<State, Actions, Payload>)(dispatch, payload /*, getState */)
        else
            return (dispatch: Dispatch | ThunkDispatch<State, undefined, Actions>, getState) =>
                (callback as Callback<State, Actions>)(dispatch /*, getState */)   
    }
}