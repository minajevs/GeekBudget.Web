import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { History } from 'history'

import Theme from './Theme'
import Routes from './Routes'
import Master from 'pages/Master'

import logo from './logo.svg'

class Root extends React.Component {
  public render() {
    return (
      <Router>
        <Theme>
          <Master>
            <Routes />
          </Master>
        </Theme>
      </Router>
    );
  }
}

export default Root
