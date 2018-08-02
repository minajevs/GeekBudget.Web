import { ActionType } from 'typesafe-actions'

import { State } from './types'
import * as actions from './actions'
import * as errorActions from 'store/errors/actions'
import { Error as InternalError } from 'store/errors/types'
import { createThunk } from 'utils'

import Api from 'api'

type Actions = ActionType<typeof actions>
type ErrorActions = ActionType<typeof errorActions>

export const getAllTabs = createThunk<State, Actions>(async (dispatch, _) => { 
    dispatch(actions.getAllTabs.request())

    try{
        const tabs = await Api.tabApi.getAll()
        return dispatch(actions.getAllTabs.response(tabs))
    } catch (e) {
        return dispatch(failure({text: e, code: 1}))
    }
})

export const failure = createThunk<State, ErrorActions, InternalError>(async (dispatch, payload) => {
    return dispatch(errorActions.throwError(payload))
})