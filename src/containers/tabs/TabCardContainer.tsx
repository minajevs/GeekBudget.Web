import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'
import * as actions from 'store/tabs/actions'

import TabCard from 'components/tabs/TabCard'

type PropsFromState = {

}

type PropsFromDispatch = {
    remove: (id: number) => () => Promise<AnyAction>
    openEdit: (tab: Tab) => () => AnyAction
}

type ComponentProps = {
    tab: Tab
    id: number
}

type ContainerProps = PropsFromState & PropsFromDispatch & ComponentProps

const TabCardContainer: React.SFC<ContainerProps> = (props: ContainerProps) => {
    const { tab, id, remove, openEdit } = props
    return (
        <TabCard
            tab={tab}
            onRemove={remove(id)}
            onEdit={openEdit(tab)}
        />
    )
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    remove: (id: number) => () => dispatch(thunks.remove(id)),
    openEdit: (tab: Tab) => () => dispatch(actions.editOpen(tab))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabCardContainer)