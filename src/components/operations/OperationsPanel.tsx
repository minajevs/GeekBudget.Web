import * as React from 'react'

import { context as addOperationContext } from 'context/operation/operationAddModal'

import { context as getOperationsContext } from 'context/operation/operations'

import OperationCard from 'components/operations/OperationCard'

import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '10px',
        borderBottom: '1px solid',
    },
    operationCard: {
        width: '100%'
    },
    operationgGrid: {
        width: '100%'
    },
    divider: {
        margin: 'auto -1rem'
    },
})

const OperationsPanel: React.SFC<WithStyles<typeof styles>> = (props: WithStyles<typeof styles>) => {
    const { classes } = props
    const addOperationStore = React.useContext(addOperationContext)

    const operationsStore = React.useContext(getOperationsContext)

    React.useEffect(() => {
        operationsStore.getAll()
    }, [])

    const content = operationsStore.loading
        ? (
            <CircularProgress />
        )
        : (
            <>
                <Grid item>
                    <Button onClick={addOperationStore.openModal}>ADD NEW</Button>
                </Grid>
                {operationsStore.operations.map((operation, i) => (
                    <React.Fragment key={i}>
                        <Grid item className={classes.operationCard}>
                            <OperationCard operation={operation} />
                            {
                                i !== operationsStore.operations.length - 1 // If not last
                                && <Divider className={classes.divider} />
                            }
                        </Grid>
                    </React.Fragment>
                ))}
            </>
        )

    return (
        <Grid container justify="center">
            <Grid item className={classes.operationgGrid}>
                <Grid
                    container
                    spacing={16}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    {content}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(OperationsPanel)