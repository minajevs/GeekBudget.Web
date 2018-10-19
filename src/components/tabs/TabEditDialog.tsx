import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Confirm from 'containers/utilities/Confirm'

const styles = (theme: Theme) => createStyles({
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

})

type Props = {
    tab: Tab | null
    onSave: (id: number, tab: Tab) => void
    onRemove: (id: number) => void
    onClose: () => void
}

type State = {
    tab: Tab
}

class TabEditDialog extends React.Component<Props & WithStyles<typeof styles>, State>{
    state: State = {
        tab: this.props.tab !== null
            ? { ...this.props.tab }
            : { id: 0, amount: 0, currency: '', name: '' }
    }
    render() {
        const { classes, tab, onClose } = this.props

        return (
            <Dialog
                open={tab !== null}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit "{tab !== null ? tab.name : ''}"</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill all the necessary fields
                    </DialogContentText>
                   {this.createInput('name')}
                   {this.createInput('type')}
                   {this.createInput('currency')}
                   {this.createInput('amount')}
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={this.confirmRemove} className={classes.deleteBtn}>
                        Delete tab
                    </Button>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    createInput = (key: keyof Tab, label: string = `Tab ${key}`) => (
        <TextField
            autoFocus
            className={this.props.classes.textField}
            margin="dense"
            id={key}
            label={label}
            onChange={this.handleChange(key)}
            value={this.state.tab[key]}
            type={
                typeof this.state.tab[key] === 'number'
                    ? 'number'
                    : 'text'
            }
        />
    )

    handleChange = (key: keyof Tab) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ tab: { ...this.state.tab, [key]: event.currentTarget.value } })
    }

    confirmRemove = () => {
        Confirm.show(
            'Do you really want to delete this tab?',
            this.handleRemove
        )
    }

    handleRemove = () => {
        this.props.onRemove(this.state.tab.id)
        this.props.onClose()
    }

    handleSave = () => {
        this.props.onSave(this.state.tab.id, this.state.tab)
        this.props.onClose()
    }

    componentWillReceiveProps = (newProps: Props) => {
        const { tab } = newProps
        if (tab !== null)
            this.setState({tab: {...tab}})
    }

}

export default withStyles(styles)(TabEditDialog)