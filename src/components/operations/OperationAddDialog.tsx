import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Operation } from 'context/operation/types'
import { context } from 'context/operation/operationAddModal'
import { context as operationsContext } from 'context/operation/operations'
import { context as tabsContext } from 'context/tab/tabs'
import { Tab } from 'context/tab/types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import TabDropdown from 'components/common/TabDropdown'

const useStyles = makeStyles(theme => ({
    field: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150
    },
}))

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

const OperationAddDialog: React.SFC = props => {
    const [state, setState] = React.useState(defaultOperation)

    const classes = useStyles()
    const store = React.useContext(context)
    const operationsStore = React.useContext(operationsContext)
    const tabsStore = React.useContext(tabsContext)

    const handleSave = React.useCallback(async (operation: Operation) => {
        await operationsStore.add(operation)
        store.closeModal()
        setState(defaultOperation)
    }, [])

    const handleTabChange = React.useCallback((key: keyof Operation) => (tab: Tab) => {
        setState(prev => ({ ...prev, [key]: tab.id }))
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
                <TabDropdown name="From" elementProps={{ className: classes.field }}
                    tabs={tabsStore.tabs} defaultValue={tabsStore.tabs[0]} onChange={handleTabChange('from')} />
                <TabDropdown name="To" elementProps={{ className: classes.field }}
                    tabs={tabsStore.tabs} defaultValue={tabsStore.tabs[0]} onChange={handleTabChange('to')} />
                {createInput(state, setState, classes.field)('comment')}
                {createInput(state, setState, classes.field)('date')}
                {createInput(state, setState, classes.field)('currency')}
                {createInput(state, setState, classes.field)('amount')}
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

export default OperationAddDialog