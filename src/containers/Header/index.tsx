import * as React from 'react';

import { Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from 'types/index';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { grey } from '@material-ui/core/colors';

type Props = {
    dispatch: Dispatch<any>;
    store: StoreState;
} & RouteComponentProps<any>;

const styles = {
    header: {
        backgroundColor: '#222',
        textAlign: 'center',
        zIndex: -99
    } as React.CSSProperties,
    settingsIcon: {
        color: grey[50],
        height: 36,
        width: 36,
        paddingLeft: '20px',
        paddingRight: '20px'
    }
};

class Header extends React.Component<Props> {
    render() {
        return (
            <Grid container justify="space-between" spacing={40} alignItems="center" style={styles.header}>
                <Grid item>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="display3" style={{ color: grey[50] }}>
                            GeekBudget
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/settings">
                        <SettingsIcon style={styles.settingsIcon} />
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    store: state
});

export default withRouter(connect(mapStateToProps)(Header));