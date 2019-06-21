import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Operation } from 'context/operation/types'
import { context } from 'context/operation/operationAddModal'
import { context as operationsContext } from 'context/operation/operations'

import { MappedPartial } from 'utils'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

const defaultOperation: Operation = {
    id: 0,
    comment: '',
    amount: 0,
    currency: 'EUR',
    from: 0,
    to: 0,
    date: new Date()
}

const createInput = (state: Operation, setState: React.Dispatch<React.SetStateAction<Operation>>, className: string) =>
    (key: keyof Operation, label: string = `Operation ${key}`) => {
        let value = key === 'date'
            ? state.date.toString()
            : state[key]
        return <TextField
            autoFocus
            className={className}
            margin="dense"
            id={key}
            label={label}
            onChange={({ currentTarget }) => setState(prev => ({ ...prev, [key]: currentTarget.value }))}
            defaultValue={value}
            type={
                typeof state[key] === 'number'
                    ? 'number'
                    : 'text'
            }
        />
    }

const OperationAddDialog: React.SFC<WithStyles<typeof styles>> = (props) => {
    const [state, setState] = React.useState(defaultOperation)

    const { classes } = props
    const store = React.useContext(context)
    const operationsStore = React.useContext(operationsContext)

    const handleSave = React.useCallback(async (operation: Operation) => {
        await operationsStore.add(operation)
        operationsStore.getAll()
        store.closeModal()
        setState(defaultOperation)
    }, [])

    return (
        <Dialog
            open={store.isOpen}
            onClose={store.closeModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add new Operation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill all the necessary fields
                </DialogContentText>
                {createInput(state, setState, classes.textField)('from')}
                {createInput(state, setState, classes.textField)('to')}
                {createInput(state, setState, classes.textField)('comment')}
                {createInput(state, setState, classes.textField)('date')}
                {createInput(state, setState, classes.textField)('currency')}
                {createInput(state, setState, classes.textField)('amount')}
            </DialogContent>
            <DialogActions>
                <Button onClick={store.closeModal}>
                    Cancel
                </Button>
                <Button onClick={() => handleSave(state)} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(OperationAddDialog)