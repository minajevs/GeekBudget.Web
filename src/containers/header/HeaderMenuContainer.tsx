import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState } from 'store'
import { InternalMenuItem, MenuItem, State } from 'store/menu/types'
import * as menuActions from 'store/menu/actions'

import HeaderMenuComponent from 'components/header/HeaderMenu'

type PropsFromState = {
    open: boolean
    anchor: HTMLElement
    internalItems: InternalMenuItem[]
}

type PropsFromDispatch = {
    closeMenu: () => void
    dispatch: Dispatch
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class ErrorContainer extends React.Component<ContainerProps> {
    public render() {
        const { open, anchor, internalItems, closeMenu, dispatch } = this.props
        return (
            <HeaderMenuComponent
                open={open}
                anchor={anchor}
                onClose={closeMenu}
                items={internalItems.map(x => new MenuItem(dispatch, x))}
            />
        )
    }
}

const mapStateToProps = ({ menu }: ApplicationState) => ({
    anchor: menu.anchor,
    internalItems: menu.items,
    open: menu.open
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    closeMenu: () => dispatch(menuActions.close()),
    dispatch: dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorContainer)