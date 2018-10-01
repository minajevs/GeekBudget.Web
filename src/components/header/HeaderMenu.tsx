import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { MenuItem } from 'store/menu/types'

import HeaderMenuItem from 'components/header/HeaderMenuItem'

import Menu from '@material-ui/core/Menu'

const styles = (theme: Theme) => createStyles({

})

type Props = {
    open: boolean
    anchor: HTMLElement
    onClose: () => void
    items: MenuItem[]
}

type AllProps = Props & WithStyles<typeof styles>

const HeaderMenu: React.SFC<AllProps> = (props: AllProps) => {
    const { classes, open, anchor, items, onClose } = props
    return (
        <Menu
            open={open}
            anchorEl={anchor}
            id="menu"
            onClose={onClose}
        >
            {items.map((item, index) => (
                <HeaderMenuItem item={item} key={index} />
            ))}
        </Menu>
    )
}

export default withStyles(styles)(HeaderMenu)