// Related
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { tabActions } from 'actions';
import { StoreState } from 'types/index';

// Router
import { Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';

// Components
import TabList from 'components/TabList';
import TabEdit from 'components/TabEdit';

import TabModel from 'models/Tab';

type Props = {
    dispatch: Dispatch<any>;
    store: StoreState;
} & RouteComponentProps<any>;

class Tabs extends React.Component<Props> {
    render() {
        const { dispatch, store } = this.props;
        return (
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        {store.tabs.isFetching ?
                            <Grid container alignItems="center" justify="center" spacing={0}>
                                <Grid item>
                                    <CircularProgress size={100} />
                                </Grid>
                            </Grid>
                            :
                            <TabList />
                        }
                    </Grid>
                    <TabEdit />
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    store: state
});

export default withRouter(connect(mapStateToProps)(Tabs));