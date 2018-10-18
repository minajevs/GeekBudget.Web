import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Operation, State } from 'store/operations/types'
import * as thunks from 'store/operations/thunks'
import * as actions from 'store/operations/actions'

import OperationCard from 'components/operations/OperationCard'

type PropsFromState = {
    editing?: number
}

type PropsFromDispatch = {
    editOpen: (id: number) => () => Promise<AnyAction>
    remove: (id: number) => () => Promise<AnyAction>
    update: (id: number) => (operation: Operation) => Promise<AnyAction>
}

type ComponentProps = {
    operation: Operation
    id: number
}

type ContainerProps = PropsFromState & PropsFromDispatch & ComponentProps

const OperationCardContainer: React.SFC<ContainerProps> = (props: ContainerProps) => {
    const { operation, editing, id, editOpen, remove, update } = props
    return (
        <OperationCard
            operation={operation}
            editing={editing === id}
            onEditOpen={editOpen(id)}
            onRemove={remove(id)}
            onSave={update(id)}
        />
    )
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    editOpen: (id: number) => () => {
        console.log('no edit');
        return dispatch(thunks.getAll())
    }/*dispatch(actions.editOpen(id))*/,
    remove: (id: number) => () => dispatch(thunks.remove(id)),
    update: (id: number) => (operation: Operation) => {
        // dispatch(actions.editClose())
        console.log('no edit')
        return dispatch(thunks.update({ id, operation }))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationCardContainer)