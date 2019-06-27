import createStateContext from 'react-concise-state'

import { createMenuItem } from 'context/header/types'

export const initialState = {
    anchor: null as HTMLElement | null,
    items: [
        createMenuItem('Throw test exception'),
        createMenuItem('Reload all'),
    ]
}

export const [context, Provider] = createStateContext(initialState, ({ setState }) => ({
    open: (anchor: HTMLElement) =>
        setState(prev => ({ ...prev, anchor })),
    close: () =>
        setState(prev => ({ ...prev, anchor: null }))
}))