import * as React from 'react'

import createStateContext, { createMiddleware } from 'react-concise-state'

import { SwaggerException } from 'api/client'

export interface InternalError {
    code: number
    text: string
    innerError?: Error
    data?: object
}

export interface BackendError {
    id: number
    description: string
}

const initialState = {
    error: null as InternalError | null,
    log: [] as InternalError[]
}

export const [context, Provider] = createStateContext(initialState, ({ setState }) => ({
    throw: (error: InternalError) =>
        setState(prev => ({ ...prev, error })),
    dismiss: () =>
        setState(prev => ({ ...prev, error: null })),
    handleError(error: Object) {
        if (SwaggerException.isSwaggerException(error)) {
            const backendErrors = JSON.parse(error.response) as BackendError[]
            this.throw({
                code: backendErrors[0].id,
                text: backendErrors[0].description
            })
        }
    }
}))

export const errorHandler = createMiddleware(async ({ stores }, next, actionKey, args) => {
    try {
        await next(args)
    } catch (ex) {
        stores.errors.handleError(ex)
    }
}, { errors: context })