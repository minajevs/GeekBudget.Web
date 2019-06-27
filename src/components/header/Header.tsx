import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { context as menuContext } from 'context/header/menu'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import MenuComponent from 'components/header/HeaderMenu'

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
})

const onMenuClick = (callback: (element: HTMLElement) => void) => (event: React.MouseEvent<HTMLElement>) =>
    callback(event.currentTarget)

const Header: React.FC<WithStyles<typeof styles>> = props => {
    const { classes } = props

    const menuStore = React.useContext(menuContext)

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        className={classes.menuButton}
                        onClick={onMenuClick(menuStore.open)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" color="inherit" className={classes.grow}>
                        GeekBudget
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
                <MenuComponent />
            </AppBar>
        </>
    )
}

export default withStyles(styles)(Header)