import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Tab } from 'context/tab/types'
import { context } from 'context/tab/tabAddModal'
import { context as tabContext } from 'context/tab/tabs'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
}))

const TabAddDialog: React.FC = props => {
    const classes = useStyles()

    const store = React.useContext(context)
    const defaultTab: Tab = React.useMemo(() => ({
        id: 0,
        name: '',
        amount: 0,
        currency: 'EUR',
        type: store.tabType || 1
    }), [store.tabType])

    const [state, setState] = React.useState(defaultTab)
    const tabStore = React.useContext(tabContext)

    const createInput = (key: keyof Tab, label: string = `Tab ${key}`) =>
        React.useMemo(() => (<TextField
            autoFocus
            className={classes.textField}
            margin="dense"
            id={key}
            label={label}
            onChange={({ currentTarget }) => setState(prev => ({ ...prev, [key]: currentTarget.value }))}
            value={state[key] || ''}
            type={
                typeof props[key] === 'number'
                    ? 'number'
                    : 'text'
            }
        />
        ), [state[key]])

    const handleSave = React.useCallback((tab) => {
        tabStore.addTab({ ...tab, type: store.tabType })
        store.closeModal()
        setState(defaultTab)
    }, [store.tabType])

    return (
        <Dialog
            open={store.isOpen}
            onClose={store.closeModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add new [type {store.tabType}] Tab</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill all the necessary fields
                    </DialogContentText>
                {createInput('name')}
                {createInput('currency')}
                {createInput('amount')}
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

export default TabAddDialog