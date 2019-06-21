import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import { context } from 'context/tab/tabEditModal'
import { context as tabContext } from 'context/tab/tabs'
import { Tab, TabType } from 'context/tab/types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Confirm from 'containers/utilities/Confirm'

import TabTypeDropdown from 'components/common/TabTypeDropdown'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

require('react-dom');
// @ts-ignore
window.React2 = require('react');
// @ts-ignore
console.log(window.React1 === window.React2);

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dialogActions: {
        display: 'flex'
    },
    deleteBtn: {
        marginRight: 'auto'
    }

}))

const defaultTab: Tab = {
    id: 0,
    name: '',
    amount: 0,
    currency: 'EUR',
    type: 1
}

const TabEditDialog: React.FC = (props) => {
    const classes = useStyles()

    const store = React.useContext(context)
    const tabStore = React.useContext(tabContext)

    const [state, setState] = React.useState(defaultTab)

    React.useEffect(() => {
        setState(store.tab || defaultTab)
    }, [store.tab])

    const createInput = (key: keyof Tab, label: string = `Tab ${key}`) => {
        return (
            <TextField
                autoFocus
                className={classes.textField}
                margin="dense"
                id={key}
                label={label}
                onChange={({ currentTarget }) => setState(prev => ({ ...prev, [key]: currentTarget.value }))}
                value={state[key]}
                type={
                    typeof state[key] === 'number'
                        ? 'number'
                        : 'text'
                }
            />
        )
    }

    const confirmRemove = () => {
        Confirm.show(
            'Do you really want to delete this tab?',
            handleRemove
        )
    }

    const handleRemove = () => {
        if (store.tab == null) return
        tabStore.removeTab(store.tab.id)
        store.closeModal()
    }

    function handleSave() {
        // if (store.tab == null) return
        tabStore.saveTab(store.tab!.id, state)
        store.closeModal()
    }

    return (
        <Dialog
            open={store.tab !== null}
            onClose={store.closeModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit "{state.name}"</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill all the necessary fields
                    </DialogContentText>
                {createInput('name')}
                <TabTypeDropdown defaultValue={state.type} onChange={console.log} />
                {createInput('currency')}
                {createInput('amount')}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={confirmRemove} className={classes.deleteBtn}>
                    Delete tab
                    </Button>
                <Button onClick={store.closeModal}>
                    Cancel
                    </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TabEditDialog