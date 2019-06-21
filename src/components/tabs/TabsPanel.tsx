import * as React from 'react'

import TabCard from 'components/tabs/TabCard'
import { Tab } from 'context/tab/types'
import { context as tabsContext } from 'context/tab/tabs'
import { context as tabAddModalContext } from 'context/tab/tabAddModal'

import { makeStyles } from '@material-ui/styles'

import TabAddButton from 'components/tabs/TabAddButton'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    tab: {
        width: 120
    }
}))

const TabsPanel: React.SFC = (props) => {
    const classes = useStyles()
    const tabsStore = React.useContext(tabsContext)
    const tabAddModalStore = React.useContext(tabAddModalContext)

    React.useEffect(() => {
        tabsStore.getAll()
    }, [])

    const content = tabsStore.loading
        ? (
            <CircularProgress />
        )
        : (
            <>
                {tabsStore.tabs.map((tab, i) => (
                    <Grid item key={i} className={classes.tab}>
                        <TabCard tab={tab} key={i} />
                    </Grid>
                ))}
                <Grid item className={classes.tab}>
                    <TabAddButton onClick={tabAddModalStore.openModal} />
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

export default TabsPanel