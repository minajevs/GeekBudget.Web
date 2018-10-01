import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Operation } from 'store/operations/types'

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '10px',
        borderBottom: '1px solid',
    },
    operation: {
        display: 'inline-block',
        width: '100px',
        border: '1px dotted'
    }
})

type Props = {
    operations: Operation[]
    children: React.ReactChild[]
    loading: boolean
    getAll: () => {}
    add: () => {}
}

const OperationsPanel: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, children, operations, loading, getAll, add } = props
    return (
        <>
            <div>
                <div>Current operations: {operations.length}</div>
                {children}
                <div>Loading: {JSON.stringify(loading)}</div>
            </div>
            <button onClick={getAll}>request</button>
            <button onClick={add}>+</button>
        </>
    )
}

export default withStyles(styles)(OperationsPanel)