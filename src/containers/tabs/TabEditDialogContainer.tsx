import * as React from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ApplicationState } from 'store'
import { Tab, State } from 'store/tabs/types'
import * as thunks from 'store/tabs/thunks'
import * as actions from 'store/tabs/actions'

import TabEditDialog from 'components/tabs/TabEditDialog'

type PropsFromState = {
    tab: Tab | null
}

type PropsFromDispatch = {
    save: (id: number, tab: Tab) => Promise<AnyAction>
    remove: (id: number) => Promise<AnyAction>
    close: () => AnyAction
}

type ContainerProps = PropsFromState & PropsFromDispatch

const TabEditDialogContainer: React.SFC<ContainerProps> = (props: ContainerProps) => {
    const { tab, save, remove, close } = props
    return (
        <TabEditDialog
            tab={tab}
            onClose={close}
            onSave={save}
            onRemove={remove}
        />
    )
}

const mapStateToProps = ({ tabs }: ApplicationState): PropsFromState => ({
    tab: tabs.editTab
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, AnyAction>): PropsFromDispatch => ({
    save: (id: number, tab: Tab) => dispatch(thunks.update({id, tab})),
    remove: (id: number) => dispatch(thunks.remove(id)),
    close: () => dispatch(actions.editClose())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabEditDialogContainer)