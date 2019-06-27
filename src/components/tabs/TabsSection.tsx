import * as React from 'react'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import TabCard from 'components/tabs/TabCard'
import TabAddButton from 'components/tabs/TabAddButton'

import { Tab, TabType } from 'context/tab/types'
import { context as tabsContext } from 'context/tab/tabs'
import { context as tabAddModalContext } from 'context/tab/tabAddModal'

type Props = {
    type: TabType
    last?: boolean
}

const useStyles = makeStyles(theme => ({
    tab: {
        width: 120
    },
    divider: {
        marginBottom: '5px'
    }
}))

const TabsSection: React.FC<Props> = props => {
    const { type, last } = props

    const classes = useStyles()
    const tabsStore = React.useContext(tabsContext)
    const tabAddModalStore = React.useContext(tabAddModalContext)

    const onAddClick = React.useCallback(() => tabAddModalStore.openModal(type), [type])

    return (
        <Grid
            container
            spacing={16}
            direction="row"
            alignItems="center"
            justify="center"
        >
            {tabsStore.tabs.filter(x => x.type === type).map((tab, i) => (
                <Grid item key={i} className={classes.tab}>
                    <TabCard tab={tab} key={i} />
                </Grid>
            ))}
            <Grid item className={classes.tab}>
                <TabAddButton onClick={onAddClick} />
            </Grid>
            <Grid item xs={12} className={classes.divider}>
                {!last && <Divider />}
            </Grid>
        </Grid>
    )
}

export default TabsSection