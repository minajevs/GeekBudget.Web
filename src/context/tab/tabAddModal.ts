import * as React from 'react'

import createStateContext from 'react-concise-state'

import { TabType } from 'context/tab/types'

export const initialState = {
    isOpen: false,
    tabType: null as TabType | null
}

export const [context, Provider] = createStateContext(initialState, ({ setState }) => ({
    openModal: (tabType: TabType) => setState({ isOpen: true, tabType }),
    closeModal: () => setState(prev => ({ ...prev, isOpen: false }))
}))