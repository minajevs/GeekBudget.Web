import * as React from 'react'
import Api from 'api'

import { errorHandler } from 'context/errors'

import { Operation } from 'context/operation/types'
import createStateContext from 'react-concise-state'

export const store = {
    operations: [] as Operation[],
    loading: false
}

export const [context, Provider] = createStateContext(store, ({ setState, stores }) => ({
    async getAll() {
        setState(prev => ({ ...prev, loading: true }))
        try {
            const operations = await Api.operationApi.getAll()
            setState(prev => ({ ...prev, operations, loading: false }))
            return operations
        } catch (ex) {
            setState(prev => ({ ...prev, loading: false }))
            throw ex
        }
    },
    update(id: number, operation: Operation) {
        Api.operationApi.update(id, operation)
        this.getAll()
    },
    async add(operation: Operation) {
        await Api.operationApi.add(operation)

        this.getAll()
    }
}), { middleware: [errorHandler] })