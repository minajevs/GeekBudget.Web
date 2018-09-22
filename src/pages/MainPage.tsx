import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState, ConnectedReduxProps } from 'store'

import TabsPanelContainer from 'containers/tabs/TabsPanelContainer'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  // loading: boolean
  // data: Hero[]
  // errors: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & ConnectedReduxProps

class MainPage extends React.Component<AllProps> {
  public render() {
    return (
      <>
        <TabsPanelContainer />
      </>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
})

export default connect(mapStateToProps)(MainPage)