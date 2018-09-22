import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Operation } from 'store/operations/types'
// import TabCardForm from 'components/operations/Ope'

const styles = (theme: Theme) => createStyles({
    operation: {
        display: 'inline-block',
        width: '300px',
        border: '1px dotted'
    },
    field: {
        paddingBottom: '5px'
    }
})

type Props = {
    operation: Operation
    editing: boolean
    onEditOpen: () => void
    onRemove: () => void
    onSave: (operation: Operation) => void
}

const OperationCard: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, operation, editing, onRemove, onEditOpen, onSave } = props
    return (
        <div className={classes.operation} onClick={onEditOpen}>
            <div className={classes.field}>Comment: {operation.comment}</div>
            <div className={classes.field}>Amount: {operation.amount}$</div>
            <div className={classes.field}>Currency: {operation.currency}</div>
            <div className={classes.field}>Id: {operation.id}</div>
            <div className={classes.field}>From: {operation.from}</div>
            <div className={classes.field}>To: {operation.to}</div>
            <div className={classes.field}>Date: {operation.date.toString()}</div>
            <div className={classes.field}><button onClick={onRemove}>remove</button></div>
        </div>
    )
}

export default withStyles(styles)(OperationCard)