import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { MenuItem } from 'context/header/types'

import { default as MenuItemComponent } from '@material-ui/core/MenuItem'

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
})

type Props = {
    item: MenuItem
}

type AllProps = Props & WithStyles<typeof styles>

const HeaderMenuItem: React.SFC<AllProps> = (props: AllProps) => {
    const { classes, item } = props
    return (
        <MenuItemComponent onClick={item.onClick}>
            {item.title}
        </MenuItemComponent>
    )
}

export default withStyles(styles)(HeaderMenuItem)