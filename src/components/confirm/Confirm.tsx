import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'
import ConfirmView from './ConfirmView';
import { EventEmitter } from 'events';

type StaticState = {
    open: boolean
    question: string
    onConfirm: () => void
    onDecline: () => void
    onClose: () => void
}

class Confirm extends React.Component{
    private static staticState: StaticState = {
        open: false,
        question: '',
        onConfirm: () => {return},
        onDecline: () => {return},
        onClose: () => {return},
    }

    private static events: EventEmitter = new EventEmitter()
   
    public static show = (
        question: string,
        onConfirm = () => {return},
        onDecline = () => {return},
        onClose = () => {return}
    ) => {
        Confirm.staticState.open = true
        Confirm.staticState.question = question
        Confirm.staticState.onConfirm = onConfirm
        Confirm.staticState.onDecline = onDecline
        Confirm.staticState.onClose = onClose

        Confirm.events.emit('show')
    }

    constructor(props: {}){
        super(props)
        
        Confirm.events.on('show', this.update)
    }

    render() {
        return (
            <ConfirmView 
                open={Confirm.staticState.open}
                question={Confirm.staticState.question}
                onConfirm={Confirm.staticState.onConfirm}
                onDecline={Confirm.staticState.onDecline}
                onClose={this.handleClose}
            />
        )
    }

    update = () => {
        this.forceUpdate()
    }
    
    handleClose = () => {
        Confirm.staticState.onClose()
        Confirm.staticState.open = false
        this.forceUpdate()
    }
}

export default Confirm