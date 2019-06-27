import * as React from 'react'
import Api from 'api'

import createStateContext from 'react-concise-state'

import { errorHandler } from 'context/errors'

import { Tab } from 'context/tab/types'

const initialState = {
    tabs: [] as Tab[],
    loading: false
}

export const [context, Provider] = createStateContext(initialState, ({ setState, stores }) => ({
    getAll: async () => {
        setState(prev => ({ ...prev, loading: true }))
        try {
            const tabs = await Api.tabApi.getAll()
            setState(prev => ({ ...prev, tabs, loading: false }))
            return tabs
        } catch (ex) {
            setState(prev => ({ ...prev, loading: false }))
            throw ex
        }
    },
    async addTab(tab: Tab) {
        await Api.tabApi.add(tab)
        this.getAll()
    },
    async saveTab(id: number, tab: Tab) {
        await Api.tabApi.update(id, tab)
        this.getAll()
    },
    async removeTab(id: number) {
        await Api.tabApi.remove(id)
        this.getAll()
    }
}), { middleware: [errorHandler] })