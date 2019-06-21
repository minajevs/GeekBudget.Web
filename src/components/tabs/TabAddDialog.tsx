import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

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

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

const defaultTab: Tab = {
    id: 0,
    name: '',
    amount: 0,
    currency: 'EUR',
    type: 1
}

const TabAddDialog: React.FC<WithStyles<typeof styles>> = (props) => {
    const [state, setState] = React.useState(defaultTab)

    const { classes } = props

    const store = React.useContext(context)
    const tabStore = React.useContext(tabContext)

    const createInput = (key: keyof Tab, label: string = `Tab ${key}`) => {
        return (<TextField
            autoFocus
            className={props.classes.textField}
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
        )
    }

    const handleSave = () => {
        tabStore.addTab(state)
        store.closeModal()
        setState(defaultTab)
    }

    return (
        <Dialog
            open={store.isOpen}
            onClose={store.closeModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add new Tab</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill all the necessary fields
                    </DialogContentText>
                {createInput('name')}
                {createInput('type')}
                {createInput('currency')}
                {createInput('amount')}
            </DialogContent>
            <DialogActions>
                <Button onClick={store.closeModal}>
                    Cancel
                    </Button>
                <Button onClick={handleSave} color="primary">
                    Add
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(TabAddDialog)