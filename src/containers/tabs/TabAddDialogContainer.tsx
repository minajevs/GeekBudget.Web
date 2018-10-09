import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'
import * as actions from 'store/tabs/actions'

import TabAddDialog from 'components/tabs/TabAddDialog'

type PropsFromState = {
    open: boolean
}

type PropsFromDispatch = {
    save: (tab: Tab) => Promise<AnyAction>
    close: () => AnyAction
}

type ContainerProps = PropsFromState & PropsFromDispatch

const TabAddDialogContainer: React.SFC<ContainerProps> = (props: ContainerProps) => {
    const { open, save, close } = props
    return (
        <TabAddDialog
            open={open}
            onClose={close}
            onSave={save}
        />
    )
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    open: tabs.addOpen
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    save: (tab: Tab) => dispatch(thunks.add(tab)),
    close: () => dispatch(actions.addClose())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabAddDialogContainer)