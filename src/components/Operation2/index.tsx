import * as React from 'react';
import { dateToString } from 'helpers';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import EuroSymbol from 'material-ui-icons/EuroSymbol';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import DeleteForever from 'material-ui-icons/DeleteForever';
import { green } from 'material-ui/colors';

import OperationModel from 'models/Operation';
import OperationEdit from 'components/OperationEdit';
import ConfirmationDialog from 'components/ConfirmationDialog';
import TabModel from 'models/Tab';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { operationActions } from 'actions';
import { StoreState } from 'types/index';

interface Props {
    operation: OperationModel;
    dispatch: Dispatch<{}>;
    tabs: TabModel[];
}

interface State {
    openConfirmationDialog: boolean;
    hover: boolean;
}

const styles = {
    paper: {
        padding: 16
    },
    menuBtn: {
        height: 'auto'
    }
};

export class Operation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            openConfirmationDialog: false,
            hover: false
        };
    }
    onEditClick = () => {
        this.props.dispatch(operationActions.uiEditOpenOperation(this.props.operation));
    }

    onRemoveClick = () => {
        this.setState({ openConfirmationDialog: true });
    }

    onRemoveConfirm = () => {
        this.props.dispatch(operationActions.removeOperation(this.props.operation.id));
        this.onRemoveClose();
    }

    onRemoveClose = () => {
        this.setState({ openConfirmationDialog: false });
    }

    hoverEnter = () => this.setState({ hover: true });
    
    hoverLeave = () => this.setState({ hover: false });
    
    render() {
        const { operation, tabs } = this.props;
        const fromTab = tabs.find(t => t.id === operation.from) as TabModel;
        const toTab = tabs.find(t => t.id === operation.to) as TabModel;
        const { hover } = this.state;
        return [(
            <Grid container spacing={0} onMouseEnter={this.hoverEnter} onMouseLeave={this.hoverLeave}>
                <Grid item xs>
                    <Paper style={styles.paper} key={operation.id} >
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                <Avatar style={{ color: green[900], backgroundColor: green[300] }}>
                                    <EuroSymbol />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography type="body1" style={{fontWeight: 500}}>
                                    {fromTab.name} -> {toTab.name}
                                </Typography>
                                <Typography type="caption">
                                    {dateToString(operation.date)}
                                </Typography>
                            </Grid>
                            <Grid item style={{ marginLeft: 'auto', marginRight: '16px', textAlign: 'right' }}>
                                <Typography type="body2">
                                    {operation.amount} €
                                </Typography>
                                <Typography type="caption">
                                    {operation.comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Grid container direction="column" spacing={0} justify="space-between" style={{height: '100%'}}>
                        <Grid item>
                            <IconButton 
                                onClick={this.onEditClick}
                                style={{ ...styles.menuBtn, visibility: hover ? 'visible' : 'hidden' }}
                            >
                                <ModeEdit />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton 
                                onClick={this.onRemoveClick}
                                style={{ ...styles.menuBtn, visibility: hover ? 'visible' : 'hidden' }}
                            >
                                <DeleteForever />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ), (
            <ConfirmationDialog
                open={this.state.openConfirmationDialog}
                onClose={this.onRemoveClose}
                onConfirm={this.onRemoveConfirm}
                title={`Do you really want to remove this operation?`}
                text={`After opeartion is deleted you can't restore it!`}
            />
        )];
    }
}

const mapStateToProps = (state: StoreState) => ({
    tabs: state.tabs.items
});

export default connect(mapStateToProps)(Operation);