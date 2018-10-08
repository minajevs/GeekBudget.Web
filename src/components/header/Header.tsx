import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

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
    onMenuClick: (anchor: HTMLElement) => void
    menu: React.ReactNode
}

type AllProps = Props & WithStyles<typeof styles>

const Header: React.SFC<AllProps> = (props: AllProps) => {
    const { classes, onMenuClick, menu } = props
    const onClick = (event: React.MouseEvent<HTMLElement>) => onMenuClick(event.currentTarget)
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" className={classes.menuButton} onClick={onClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" color="inherit" className={classes.grow}>
                        GeekBudget
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
                {menu}
            </AppBar>
        </>
    )
}

export default withStyles(styles)(Header)