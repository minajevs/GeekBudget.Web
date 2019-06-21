import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Operation } from 'context/operation/types'

import { context as tabsContext } from 'context/tab/tabs'
import { context as operationsContext } from 'context/operation/operations'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DropdownDisplayField, { Option } from 'components/common/DropdownDisplayField'
import InputDisplayField from 'components/common/InputDisplayField'
import { Tab } from 'context/tab/types'

const styles = (theme: Theme) => createStyles({
    container: {
        flexGrow: 1,
    },
    comment: {
        fontStyle: 'italic'
    },
    input: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    inputHidden: {
        visibility: 'hidden',
        '&:hover': {
            visibility: 'visible'
        }
    },
})

type Props = {
    operation: Operation
}

const OperationCard: React.SFC<Props & WithStyles<typeof styles>> = (props) => {
    const { classes, operation } = props

    const tabsStore = React.useContext(tabsContext)
    const operationsStore = React.useContext(operationsContext)

    const options = mapTabsToOptions(tabsStore.tabs)

    const updateField = (field: keyof Operation) => (value: Operation[typeof field]) => {
        return operationsStore.update(operation.id, { ...operation, [field]: value })
    }

    const fromElement = <DropdownDisplayField
        defaultValue={operation.from}
        options={options}
        onSave={updateField('from')}
    />

    const toElement = <DropdownDisplayField
        defaultValue={operation.to}
        options={options}
        onSave={updateField('to')}
    />

    const commentElement = <InputDisplayField
        defaultValue={operation.comment || ''}
        onSave={updateField('comment')}
        placeholder="Add your comment..."
        fullWidth
    />

    const amountElement = <InputDisplayField
        defaultValue={operation.amount}
        onSave={updateField('amount')}
        shrinkToWidth
        type="currency"
    />
    return (
        <Grid
            container
            spacing={16}
            alignItems="center"
            justify="space-between"
            className={classes.container}
        >
            <Grid item xs container direction="column" >
                <Grid item>
                    <Typography
                        className={classes.input}
                        variant="subtitle1">
                        {fromElement}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        className={classes.input}
                        variant="h6">
                        {toElement}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="caption"
                        className={classes.comment + ' ' + classes.input}>
                        {commentElement}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    className={classes.input}>
                    - {amountElement} {operation.currency}
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapTabsToOptions = (tabs: Tab[]): Option[] =>
    tabs.map(tab => ({
        text: tab.name,
        value: tab.id
    }))

export default withStyles(styles)(OperationCard)