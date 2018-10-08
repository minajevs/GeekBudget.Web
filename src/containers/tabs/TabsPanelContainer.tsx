import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'

import TabsPanel from 'components/tabs/TabsPanel'
import TabCardContainer from 'containers/tabs/TabCardContainer'

type PropsFromState = {
    tabs: Tab[]
    loading: boolean
}

type PropsFromDispatch = {
    getAll: () => Promise<AnyAction>
    add: () => Promise<AnyAction>
}

type ContainerProps = PropsFromState & PropsFromDispatch

const TabsPanelContainer: React.SFC<ContainerProps> = (props: ContainerProps) => {
    const { tabs, loading, getAll, add } = props
    return (
        <TabsPanel
            tabs={mapTabsToCards(tabs)}
            loading={loading}
            getAll={getAll}
            add={add}
        />
    )
}

const mapTabsToCards = (tabs: Tab[]) => tabs.map((tab, i) => (
    <TabCardContainer tab={tab} id={i} key={i} />
))

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    tabs: tabs.tabs,
    loading: tabs.loading
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    getAll: () => dispatch(thunks.getAll()),
    add: () => {
        dispatch(thunks.add({ name: 'Test', amount: 10, currency: 'USD', id: 1 }))
        return dispatch(thunks.getAll())
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabsPanelContainer)