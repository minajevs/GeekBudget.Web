import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles, Button } from '@material-ui/core'

import { Tab } from 'store/tabs/types'

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '10px',
        borderBottom: '1px solid',
    },
    tab: {
        display: 'inline-block',
        width: '100px',
        border: '1px dotted'
    }
})

type Props = {
    tabs: Tab[]
    children: React.ReactChild[]
    loading: boolean
    getAll: () => {}
    add: () => {}
}

const TabsPanel: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, children, tabs, loading, getAll, add } = props
    return (
        <>
            <div>
                <div>Current tabs: {tabs.length}</div>
                {children}
                <div>Loading: {JSON.stringify(loading)}</div>
            </div>
            <button onClick={getAll}>request</button>
            <button onClick={add}>+</button>
        </>
    )
}

export default withStyles(styles)(TabsPanel)