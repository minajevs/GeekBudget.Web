import * as React from 'react'
import { connect } from 'react-redux'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

type OwnProps = {
  children: React.ReactNode
}

// TODO: theme state
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
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
