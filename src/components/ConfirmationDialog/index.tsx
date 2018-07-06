import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

interface Props{
    open: boolean;
    title: string;
    text: string;
    onConfirm?: () => void;
    onDecline?: () => void;
    onClose: () => void;
}

export default class ConfirmationDialog extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() { // TODO: https://reactjs.org/docs/portals.html
        const {onClose, onConfirm, onDecline, title, text, open} = this.props;
        const onDeclineInternal = () => {
            onClose();
            if (onDecline != null) onDecline();
        };

        const onConfirmInternal = () => {
            onClose();
            if (onConfirm != null) onConfirm();
        };

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDeclineInternal} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={onConfirmInternal} color="secondary">
                        Yes
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}