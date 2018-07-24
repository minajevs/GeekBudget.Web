import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import { ApplicationState, ConnectedReduxProps } from 'store'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  // loading: boolean
  // data: Hero[]
  // errors: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps

class MainPage extends React.Component<AllProps> {
  public render() {
    return (
      <div>Main page</div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
})

export default connect(mapStateToProps)(MainPage)