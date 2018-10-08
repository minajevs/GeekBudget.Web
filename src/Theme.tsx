import * as React from 'react'
import { connect } from 'react-redux'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import teal from '@material-ui/core/colors/teal'
import blueGrey from '@material-ui/core/colors/blueGrey'
import deepOrange from '@material-ui/core/colors/deepOrange'

type OwnProps = {
  children: React.ReactNode
}

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
    background: {
      default: blueGrey[50],
    },
    
    // error: will use the default color
  },
});

class Theme extends React.Component<OwnProps> {
  public render() {
    const { children } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

// map state to props

export default connect()(Theme)
