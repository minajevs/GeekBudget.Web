import * as React from 'react'
import ConfirmView from 'components/confirm/ConfirmView'
import { EventEmitter } from 'events'

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
        Confirm.staticState = {
            open: true,
            question,
            onConfirm,
            onDecline,
            onClose
        }

        Confirm.events.emit('@@confirm/update')
    }

    constructor(props: {}){
        super(props)
        
        Confirm.events.on('@@confirm/update', this.forceUpdate.bind(this))
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
    
    handleClose = () => {
        Confirm.staticState.open = false
        Confirm.staticState.onClose()
        this.forceUpdate()
    }
}

export default Confirm