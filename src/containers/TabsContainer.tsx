import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'
import * as actions from 'store/tabs/actions'

import TabsPanel from 'components/tabs/TabsPanel'
import TabCard from 'components/tabs/TabCard'

type PropsFromState = {
    tabsState: State
}

type PropsFromDispatch = {
    getAll: () => Promise<AnyAction>
    remove: (id: number) => Promise<AnyAction>
    add: (tab: Tab) => Promise<AnyAction>
    update: (id: number, tab: Tab) => Promise<AnyAction>

    editOpen: (id: number) => AnyAction
    editClose: () => AnyAction
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class TabsContainer extends React.Component<ContainerProps> {
    public render() {
        const { tabsState, getAll, remove } = this.props
        return (
            <TabsPanel
                tabs={tabsState.tabs}
                loading={tabsState.loading}
                getAll={getAll}
                add={this.add}
            >
                {tabsState.tabs.map((tab, i) => (
                    <TabCard
                        tab={tab}
                        editing={tabsState.editing === i}
                        onEditOpen={this.editOpen(i)}
                        onSave={this.update(i)}
                        onRemove={this.remove(i)}
                        key={i} />
                ))}
            </TabsPanel>
        )
    }

    private add = async () => {
        await this.props.add({ name: 'Test', amount: 10, currency: 'USD', id: 1 })
        this.props.getAll()
    }

    private editOpen = (id: number) => async () => {
        this.props.editOpen(id)
    }

    private update = (id: number) => async (tab: Tab) => {
        await this.props.update(id, tab)
        this.props.editClose()
        this.props.getAll()
    }

    private remove = (id: number) => async () => {
        await this.props.remove(id)
        this.props.getAll()
    }
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    tabsState: tabs
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    getAll: () => dispatch(thunks.getAll()),
    add: (tab: Tab) => dispatch(thunks.add(tab)),
    remove: (id: number) => dispatch(thunks.remove(id)),
    update: (id: number, tab: Tab) => dispatch(thunks.update({ id, tab })),
    editOpen: (id: number) => dispatch(actions.editOpen(id)),
    editClose: () => dispatch(actions.editClose()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabsContainer)