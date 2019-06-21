import * as React from 'react'

import createStateContext from 'react-concise-state'

import { Tab } from 'context/tab/types'

export const initialState = {
    tab: null as Tab | null,

}

export const [context, Provider] = createStateContext(initialState, ({ setState, stores }) => ({
    openModal: (payload: Tab) =>
        setState(state => ({ ...state, tab: payload })),
    closeModal: () =>
        setState(state => ({ ...state, tab: null })),
}))