import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState, ConnectedReduxProps } from 'store'

import MasterComponent from 'components/pages/Master'
import HeaderContainer from 'containers/header/HeaderContainer'
import ErrorContainer from 'containers/ErrorContainer'

type Props = {
    children: React.ReactNode
}

const MainPage: React.SFC<Props> = (props: Props) => (
    <MasterComponent>
        <HeaderContainer />
        {props.children}
        <ErrorContainer />
    </MasterComponent>
)

const mapStateToProps = (state: ApplicationState) => ({
})

export default connect(mapStateToProps)(MainPage)