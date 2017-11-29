import * as React from 'react';
import { withRouter } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from 'types/index';
import * as actions from 'actions/settingsActions';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import InlineEdit from 'components/InlineEdit';

interface Props {
    dispatch: Dispatch<{}>;
    store: StoreState;
}

class Settings extends React.Component<Props> {
    render() {
        const items = this.props.store.settings.items;
        const { dispatch } = this.props;
        return (
            <div>
                <Paper>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(x =>
                                <TableRow key={x.key}>
                                    <TableCell style={{ width: '50%' }}>{x.key}</TableCell>
                                    <TableCell style={{ width: '50%' }}>
                                        <InlineEdit
                                            defaultValue={x.value}
                                            onSave={
                                                (value: string) =>
                                                    dispatch(actions.setSetting({ key: x.key, value: value }))
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    store: state
});

export default withRouter(connect(mapStateToProps)(Settings));