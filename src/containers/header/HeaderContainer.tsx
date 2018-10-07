import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState } from 'store'
import { InternalMenuItem, State } from 'store/menu/types'
import * as menuActions from 'store/menu/actions'

import HeaderMenuContainer from 'containers/header/HeaderMenuContainer'
import HeaderComponent from 'components/header/Header'

type PropsFromState = {

}

type PropsFromDispatch = {
    openMenu: (anchor: HTMLElement) => void
    closeMenu: () => void
}

type ContainerProps = PropsFromState & PropsFromDispatch

export class HeaderContainer extends React.Component<ContainerProps> {
    public render() {
        const { openMenu, closeMenu } = this.props

        return (
            <HeaderComponent
                onMenuClick={openMenu}
                menu={
                    <HeaderMenuContainer />
                }
            />
        )
    }
}

const mapStateToProps = ({ menu }: ApplicationState) => ({
    open: menu.open
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openMenu: (anchor: HTMLElement) => dispatch(menuActions.open(anchor)),
    closeMenu: () => dispatch(menuActions.close())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer)