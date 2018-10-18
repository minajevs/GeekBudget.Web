import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import TabAddButton from 'components/tabs/TabAddButton'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme: Theme) => createStyles({
    tab: {
        width: 120
    }
})

type Props = {
    tabs: React.ReactChild[]
    loading: boolean
    add: () => {}
}

const TabsPanel: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, tabs, loading, add } = props

    const content = loading
        ? (
            <CircularProgress />
        )
        : (
            <>
                {tabs.map((tab, i) => (
                    <Grid item key={i} className={classes.tab}>
                        {tab}
                    </Grid>
                ))}
                <Grid item className={classes.tab}>
                    <TabAddButton onClick={add} />
                </Grid>
            </>
        )

    return (
        <Grid container justify="center">
            <Grid item>
                <Grid
                    container
                    spacing={16}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    {content}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(TabsPanel)