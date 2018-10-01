import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState } from 'store'
import { Error, State } from 'store/errors/types'
import * as actions from 'store/errors/actions'
import ErrorComponent from 'components/Error'

type PropsFromState = {
    error?: Error
}

type PropsFromDispatch = {
    throwError: typeof actions.throwError
    dismissError: typeof actions.dismissError
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class ErrorContainer extends React.Component<ContainerProps> {
    public render() {
        const { error, dismissError } = this.props
        return (
            <ErrorComponent error={error} onClick={dismissError} />
        )
    }
}

const mapStateToProps = ({ errors }: ApplicationState) => ({
    error: errors.error
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    throwError: (error: Error) => dispatch(actions.throwError(error)),
    dismissError: () => dispatch(actions.dismissError())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorContainer)