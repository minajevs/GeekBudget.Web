import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState } from 'store'
import { Error, State } from 'store/errors/types'
import * as actions from 'store/errors/actions'
import ErrorComponent from 'components/Error'

type PropsFromState = {
    errorState: State
}

type PropsFromDispatch = {
    throwError: typeof actions.throwError
    dismissError: typeof actions.dismissError
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class ErrorContainer extends React.Component<ContainerProps> {
    public render() {
        const { errorState, throwError, dismissError } = this.props
        return (
            <>
                <div>
                    Current error: <ErrorComponent error={errorState.error} onClick={() => dismissError()} />
                    Past errors: {errorState.log.map(x => x.text)}
                </div>
                <button onClick={() => throwError({ code: 1, text: 'Test error' })}>throw</button>
                <hr />
            </>
        )
    }
}

const mapStateToProps = ({ errors }: ApplicationState) => ({
    errorState: errors
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    throwError: (error: Error) => dispatch(actions.throwError(error)),
    dismissError: () => dispatch(actions.dismissError())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorContainer)