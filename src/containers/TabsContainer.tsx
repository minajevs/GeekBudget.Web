import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'
import thunk, { ThunkAction, ThunkDispatch } from '../../node_modules/redux-thunk';
// import ErrorComponent from 'components/Error'

type PropsFromState = {
    tabsState: State
}

type PropsFromDispatch = {
    getAll: () => Promise<AnyAction>
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class TabsContainer extends React.Component<ContainerProps> {
    public render() {
        const { tabsState, getAll } = this.props
        return (
            <>
            <div>
                Current tabs: {tabsState.tabs.length}
                {tabsState.tabs.map(tab => 
                    (<div>
                        <div>Name: {tab.name}</div>
                        <div>Id: {tab.id}</div>
                        <div>Currency: {tab.currency}</div>
                        <div>Amount: {tab.amount}$</div>
                    </div>)
                )}
                Loading: { JSON.stringify(tabsState.loading) }
            </div>
            <button onClick={getAll}>request</button>
            </>
        )
    }
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    tabsState: tabs
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    getAll: () => dispatch(thunks.getAllTabs())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TabsContainer)