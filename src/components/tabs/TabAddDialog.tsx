import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'
import { MappedPartial } from 'utils'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { number } from 'prop-types';

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

type Props = {
    open: boolean
    onSave: (tab: Tab) => void
    onClose: () => void
}

type State = {
    tab: Tab
}

class TabCard extends React.Component<Props & WithStyles<typeof styles>, State>{
    state: State = {
        tab: {
            id: 0,
            name: '',
            amount: 0,
            currency: 'EUR',
            type: 1
        }
    }
    render() {
        const { tab } = this.state
        const { classes, open, onSave, onClose } = this.props

        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new Tab</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill all the necessary fields
                    </DialogContentText>
                   {this.createInput('name')}
                   {this.createInput('type')}
                   {this.createInput('currency')}
                   {this.createInput('amount')}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        Add
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
                typeof this.props[key] === 'number'
                    ? 'number'
                    : 'text'
            }
        />
    )

    handleChange = (key: keyof Tab) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ tab: { ...this.state.tab, [key]: event.currentTarget.value } })
    }

    handleSave = () => {
        this.props.onSave(this.state.tab)
        this.props.onClose()
    }

}

export default withStyles(styles)(TabCard)