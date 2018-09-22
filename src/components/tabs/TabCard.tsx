import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'
import TabCardForm from './TabCardForm';

const styles = (theme: Theme) => createStyles({
    tab: {
        display: 'inline-block',
        width: '300px',
        border: '1px dotted'
    },
    field: {
        paddingBottom: '5px'
    }
})

type Props = {
    tab: Tab
    editing: boolean
    onEditOpen: () => void
    onRemove: () => void
    onSave: (tab: Tab) => void
}

const TabCard: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, tab, editing, onRemove, onEditOpen, onSave } = props
    if (editing)
        return (
            <div className={classes.tab}>
                <TabCardForm defaultTab={tab} onSave={onSave} />
            </div>
        )

    return (
        <div className={classes.tab} onClick={onEditOpen}>
            <div className={classes.field}>Name: {tab.name}</div>
            <div className={classes.field}>Type: {tab.type}</div>
            <div className={classes.field}>Id: {tab.id}</div>
            <div className={classes.field}>Currency: {tab.currency}</div>
            <div className={classes.field}>Amount: {tab.amount}$</div>
            <div className={classes.field}><button onClick={onRemove}>remove</button></div>
        </div>
    )
}

export default withStyles(styles)(TabCard)