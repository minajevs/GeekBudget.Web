import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { context } from 'context/header/menu'
import { MenuItem } from 'context/header/types'

import { context as errorContext } from 'context/errors'
import { context as tabContext } from 'context/tab/tabs'
import { context as operationContext } from 'context/operation/operations'

import HeaderMenuItem from 'components/header/HeaderMenuItem'

import Menu from '@material-ui/core/Menu'

const styles = (theme: Theme) => createStyles({

})

const HeaderMenu: React.SFC<WithStyles<typeof styles>> = (props: WithStyles<typeof styles>) => {
    const store = React.useContext(context)
    const tabStore = React.useContext(tabContext)
    const operationStore = React.useContext(operationContext)
    const errorStore = React.useContext(errorContext)

    const item1 = store.items[0](() => errorStore.throw({
        code: 1337,
        text: 'Test error',
        data: { foo: 'foo', bar: 42 },
        innerError: new Error('Inner error with some text')
    }))
    const item2 = store.items[1](() => {
        // does not work yet because tab and op providers are on the different components and do not include a menu
        tabStore.getAll()
        operationStore.getAll()
    })
    return (
        <Menu
            open={store.anchor !== null}
            anchorEl={store.anchor}
            id="menu"
            onClose={store.close}
        >
            <HeaderMenuItem item={item1} />
            <HeaderMenuItem item={item2} />
        </Menu>
    )
}

export default withStyles(styles)(HeaderMenu)