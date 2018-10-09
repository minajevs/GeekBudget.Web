import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState, ConnectedReduxProps } from 'store'

import TabsPanelContainer from 'containers/tabs/TabsPanelContainer'
import OperationsPanelContainer from 'containers/operations/OperationsPanelContainer'

import MainPageComponent from 'components/pages/MainPage'
import TabAddDialogContainer from 'containers/tabs/TabAddDialogContainer';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  // loading: boolean
  // data: Hero[]
  // errors: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & ConnectedReduxProps

const MainPage: React.SFC<AllProps> = (props: AllProps) => (
  <MainPageComponent
    tabColumn={
      <TabsPanelContainer />
    }
    operationColumn={
      <OperationsPanelContainer />
    }
    children={
        <TabAddDialogContainer />
    }
  />
)

const mapStateToProps = (state: ApplicationState) => ({
})

export default connect(mapStateToProps)(MainPage)