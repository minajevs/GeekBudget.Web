import * as React from 'react'

import createStateContext from 'react-concise-state'

export const initialState = {
    isOpen: false
}

export const [context, Provider] = createStateContext(initialState, ({ setState }) => ({
    openModal: () =>
        setState(prev => ({ ...prev, isOpen: true })),
    closeModal: () =>
        setState(prev => ({ ...prev, isOpen: false }))
}))