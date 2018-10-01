import * as React from 'react'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'

import { ApplicationState } from 'store'

import Theme from './Theme'
import Routes from './Routes'
import Master from 'pages/Master'

import logo from './logo.svg'

type OwnProps = {
  store: Store<ApplicationState>
  history: History
}

class Root extends React.Component<OwnProps> {
  public render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Theme>
            <Master>
              <Routes />
            </Master>
          </Theme>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default connect()(Root)
