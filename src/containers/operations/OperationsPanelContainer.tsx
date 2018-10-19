import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Operation, State } from 'store/operations/types'
import * as thunks from 'store/operations/thunks'

import OperationsPanel from 'components/operations/OperationsPanel'
import OperationCardContainer from 'containers/operations/OperationCardContainer'

type PropsFromState = {
    operations: Operation[]
    loading: boolean
}

type PropsFromDispatch = {
    getAll: () => Promise<AnyAction>
    add: () => Promise<AnyAction>
}

type ContainerProps = PropsFromState & PropsFromDispatch

class TabsPanelContainer extends React.Component<ContainerProps>{
    componentDidMount() {
        this.props.getAll()
    }

    render() {
        const { operations, loading, getAll, add } = this.props
        return (
            <OperationsPanel
                operations={operations}
                loading={loading}
                getAll={getAll}
                add={add}
            >
                {operations.map((operation, i) => (
                    <OperationCardContainer operation={operation} id={i} key={i} />
                ))}
            </OperationsPanel>
        )
    }
}

const mapStateToProps = ({ operations }: ApplicationState): PropsFromState => ({
    operations: operations.operations,
    loading: operations.loading
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    getAll: () => dispatch(thunks.getAll()),
    add: () => {
        dispatch(
            thunks.add({ id: 1, amount: 10, currency: 'EUR', comment: 'comment1', from: 1, to: 2, date: new Date() }))
        return dispatch(thunks.getAll())
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabsPanelContainer)