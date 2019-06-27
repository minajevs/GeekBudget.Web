import * as React from 'react'

export type ContextStoreTuple<T = {}> = {
    context: React.Context<T>,
    store: T
}

type Props = {
    values: ContextStoreTuple[],
    children: React.ReactElement
}

const CombineProviders: React.SFC<Props> = (props: Props) => {
    return props.values.reduce(
        (element, tuple, ) => {
            return <tuple.context.Provider value={tuple.store} children={element} />
        },
        props.children)
}

export default CombineProviders