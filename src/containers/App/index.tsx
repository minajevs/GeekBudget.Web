// React
import * as React from 'react';
// import { withStyles } from 'material-ui/styles'; TODO!!
import Grid from '@material-ui/core/Grid';
import './style.css';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { tabActions } from 'actions';
import { StoreState } from 'types/index';

// Router
import { Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';

// Components
import TabModel from 'models/Tab';

import HeaderContainer from 'containers/Header';
import SettingsContainer from 'containers/Settings';
import TabsContainer from 'containers/Tabs';
import OperationsContainer from 'containers/Operations';

type Props = {
    dispatch: Dispatch<any>;
    store: StoreState;
} & RouteComponentProps<any>;

const logo = require('./logo.svg');

const styles = {
    app: {
        fontFamily: 'roboto'
    },
    link: {
        backgroundColor: '#fff',
        margin: '10px'
    }
};

class App extends React.Component<Props> {
    render() {
        const { dispatch, store } = this.props;
        return (
            <Grid container style={styles.app} spacing={40} justify="center">
                <Grid item xs={12}>
                    <HeaderContainer />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Grid container justify="center">
                        <Route
                            exact
                            path="/"
                            render={() => [
                                <Grid item md={6} xs={12} key="tabs">
                                    <TabsContainer />
                                </Grid>,
                                <Grid item md={6} xs={12} key="operations">
                                    <OperationsContainer />
                                </Grid>
                            ]}
                        />
                        <Route
                            path="/settings"
                            render={() =>
                                <Grid item md={8} xs={12} key="tabs">
                                    <SettingsContainer />
                                </Grid>
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    store: state
});

export default withRouter(connect(mapStateToProps)(App));