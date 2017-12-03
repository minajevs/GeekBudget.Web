import * as React from 'react';

import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import DeleteForever from 'material-ui-icons/DeleteForever';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import TabModel from 'models/Tab';
import { blue } from 'material-ui/colors';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { tabActions } from 'actions';
import { StoreState } from 'types/index';

import ConfirmationDialog from 'components/ConfirmationDialog';

interface Props {
    tab: TabModel;
    dispatch: Dispatch<{}>;
}

interface State {
    openConfirmationDialog: boolean;
    menuEl: HTMLElement | undefined;
    hover: boolean;
}

const styles = {
    tab: {
        cursor: 'pointer'
    },
    menuBtn: {
        height: 'auto'
    }
};

class Tab extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            openConfirmationDialog: false,
            menuEl: undefined,
            hover: false
        };
    }

    onEditClick = () => {
        this.props.dispatch(tabActions.uiEditOpenTab(this.props.tab));
    }

    onRemoveClick = () => {
        this.setState({ openConfirmationDialog: true });
    }

    onRemoveConfirm = () => {
        this.props.dispatch(tabActions.removeTab(this.props.tab.id));
        this.onRemoveClose();
    }

    onRemoveClose = () => {
        this.setState({ openConfirmationDialog: false });
    }

    hoverEnter = () => this.setState({ hover: true });

    hoverLeave = () => this.setState({ hover: false });

    render() {
        const { hover } = this.state;
        const { tab } = this.props;
        return [(
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={0}
                onMouseEnter={this.hoverEnter}
                onMouseLeave={this.hoverLeave}
                key={tab.id}
            >
                <Grid item>
                    <IconButton
                        onClick={this.onEditClick}
                        style={{ ...styles.menuBtn, visibility: hover ? 'visible' : 'hidden' }}
                    >
                        <ModeEdit />
                    </IconButton>
                    <IconButton
                        onClick={this.onRemoveClick}
                        style={{ ...styles.menuBtn, visibility: hover ? 'visible' : 'hidden' }}
                    >
                        <DeleteForever />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Avatar
                        aria-label="TabIcon"
                        style={{ color: blue[900], backgroundColor: blue[300] }}
                    >
                        <AccountBalanceWallet />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography type="body2">
                        {tab.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography type="caption">
                        {tab.amount} €
                        </Typography>
                </Grid>
            </Grid>
        ),
        (
            <ConfirmationDialog
                key={tab.id + 'confirm'}
                open={this.state.openConfirmationDialog}
                onClose={this.onRemoveClose}
                onConfirm={this.onRemoveConfirm}
                title={`Do you really want to remove this tab?`}
                text={`After tab is deleted you can't restore it!`}
            />
        )
        ];
    }
}

export default connect()(Tab);