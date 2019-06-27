import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = (theme: Theme) => createStyles({
    main: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            margin: 'auto'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'auto 2rem'
        }
    },
    grid: {
        marginTop: '1rem'
    },
    panel: {
        padding: '1rem'
    }
})

type Props = {
    tabColumn: React.ReactNode
    operationColumn: React.ReactNode
    children?: React.ReactNode
}

const MainPage: React.FC<Props & WithStyles<typeof styles>> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, tabColumn, operationColumn, children } = props
    return (
        <>
            <main className={classes.main}>
                <Grid container spacing={24} className={classes.grid}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.panel}>
                            {tabColumn}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.panel}>
                            {operationColumn}
                        </Paper>
                    </Grid>
                </Grid>
            </main>
            {children}
        </>
    )
}

export default withStyles(styles)(MainPage)