import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import TabAddButton from 'components/tabs/TabAddButton'

import Grid from '@material-ui/core/Grid'

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '10px',
        borderBottom: '1px solid',
    },
    tab: {
        width: 120
    }
})

type Props = {
    tabs: React.ReactChild[]
    loading: boolean
    getAll: () => {}
    add: () => {}
}

const handleClick = () => console.log

const TabsPanel: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, tabs, loading, getAll, add } = props
    return (
        <>
            <Grid container justify="center">
                <Grid item>
                    <Grid
                        container
                        spacing={16}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        className={classes.container}
                    >
                        {tabs.map((tab, i) => (
                            <Grid item key={i} className={classes.tab}>
                                {tab}
                            </Grid>
                        ))}
                        <Grid item className={classes.tab}>
                            <TabAddButton onClick={handleClick} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <div>Current tabs: {tabs.length}</div>
                <div>Loading: {JSON.stringify(loading)}</div>
            </div>
            <button onClick={getAll}>request</button>
            <button onClick={add}>+</button>
        </>
    )
}

export default withStyles(styles)(TabsPanel)