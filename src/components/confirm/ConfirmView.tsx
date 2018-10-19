import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const styles = (theme: Theme) => createStyles({
    error: {
        padding: '10px',
        border: '1px solid',
        width: '100px',
    }
})

type Props = {
    open: boolean
    question: string
    onConfirm: () => void
    onDecline: () => void
    onClose: () => void
}

class Confirm extends React.Component<Props>{
    render() {
        const { open, question } = this.props
        return <Dialog
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onClose={this.handleClose}
        >
            <DialogContent>
                <Typography>{question}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleDecline} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleConfirm} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    }

    handleConfirm = () => {
        this.props.onConfirm()
        this.props.onClose()
    }

    handleDecline = () => {
        this.props.onDecline()
        this.props.onClose()
    }

    handleClose = () => {
        this.props.onClose()
    }
}

export default withStyles(styles)(Confirm)