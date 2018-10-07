import { ActionType } from 'typesafe-actions'

import { State, Tab } from './types'
import * as actions from './actions'
import * as errorActions from 'store/errors/actions'
import { createThunk, PayloadCallback } from 'utils'

import Api from 'api'
import { ThunkDispatch } from 'redux-thunk';

type Actions = ActionType<typeof actions>
type ErrorActions = ActionType<typeof errorActions>

type AllowedActions = Actions | ErrorActions

export const getAll = createThunk<State, AllowedActions>(async dispatch => {
    dispatch(actions.getAll.request())

    try {
        const tabs = await Api.tabApi.getAll()
        return dispatch(actions.getAll.response(tabs))
    } catch (e) {
        return handleError(e, dispatch)
    }
})

export const get = createThunk<State, AllowedActions, number>(async (dispatch, payload) => {
    dispatch(actions.get.request(payload))

    try {
        const tab = await Api.tabApi.get(payload)
        return dispatch(actions.get.response(tab))
    } catch (e) {
        return handleError(e, dispatch)
    }
})

export const add = createThunk<State, AllowedActions, Tab>(async (dispatch, payload) => {
    dispatch(actions.add.request(payload))

    try {
        const id = await Api.tabApi.add(payload)
        return dispatch(actions.add.response(id))
    } catch (e) {
        return handleError(e, dispatch)
    }
})

export const remove = createThunk<State, AllowedActions, number>(async (dispatch, payload) => {
    dispatch(actions.remove.request(payload))

    try {
        await Api.tabApi.remove(payload)
        return dispatch(actions.remove.response())
    } catch (e) {
        return handleError(e, dispatch)
    }
})

export const update = createThunk<State, AllowedActions, { id: number, tab: Tab }>(async (dispatch, payload) => {
    dispatch(actions.update.request(payload))

    try {
        await Api.tabApi.update(payload.id, payload.tab)
        return dispatch(actions.update.response())
    } catch (e) {
        return handleError(e, dispatch)
    }
})

const handleError = (errorText: string, dispatch: ThunkDispatch<State, undefined, AllowedActions>) => {
    const error = { text: errorText, code: 1 }
    dispatch(actions.failure(error))
    return dispatch(errorActions.throwError(error))
}