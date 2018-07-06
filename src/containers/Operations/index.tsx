// Related
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { operationActions } from 'actions';
import { StoreState } from 'types/index';

// Router
import { Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

// Components
import Operation from 'components/Operation';
import OperationList from 'components/OperationList';
import OperationEdit from 'components/OperationEdit';
import OperationModel from 'models/Operation';

type Props = {
    dispatch: Dispatch<any>;
    store: StoreState;
} & RouteComponentProps<any>;

class Operations extends React.Component<Props> {
    render() {
        const { dispatch, store } = this.props;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Button 
                        variant="raised" 
                        onClick={() => dispatch(operationActions.uiEditOpenOperation(new OperationModel()))}
                    >
                        <AddIcon />
                        Add new operation
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {store.operations.isFetching ?
                        <Grid container alignItems="center" justify="center" spacing={0}>
                            <Grid item>
                                <CircularProgress size={100} />
                            </Grid>
                        </Grid>
                        :
                        <OperationList />
                    }
                </Grid>
                <OperationEdit />
            </Grid>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    store: state
});

export default withRouter(connect(mapStateToProps)(Operations));