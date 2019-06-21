import * as React from 'react'

import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import teal from '@material-ui/core/colors/teal'
import blueGrey from '@material-ui/core/colors/blueGrey'
import deepOrange from '@material-ui/core/colors/deepOrange'

type OwnProps = {
  children: React.ReactNode
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
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
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }
}

// map state to props

export default Theme