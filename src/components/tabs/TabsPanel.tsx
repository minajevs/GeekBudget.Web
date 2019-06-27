import * as React from 'react'

import { context as tabsContext } from 'context/tab/tabs'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import TabsSection from 'components/tabs/TabsSection'
import { TabType } from 'context/tab/types';

const TabsPanel: React.SFC = (props) => {
    const tabsStore = React.useContext(tabsContext)

    React.useEffect(() => {
        tabsStore.getAll()
    }, [])

    const content = tabsStore.loading
        ? (
            <CircularProgress />
        )
        : (
            <>
                <TabsSection type={TabType.Income} />
                <TabsSection type={TabType.Account} />
                <TabsSection type={TabType.Expense} last/>
            </>
        )

    return (
        <Grid container justify="center">
            {content}
        </Grid>
    )
}

export default TabsPanel