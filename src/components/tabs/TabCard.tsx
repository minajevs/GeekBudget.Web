import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { context } from 'context/tab/tabEditModal'

import { Tab } from 'context/tab/types'

import TabCardEditChip from 'components/tabs/TabCardEditChip'

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const styles = (theme: Theme) => createStyles({
    container: {
        position: 'relative'
    },
    avatar: {
        height: 56,
        width: 56,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    tabName: {
        width: 110,
        textAlign: 'center',
        fontWeight: 700,
    },
    tabNameRow: {
        height: '1.5em'
    },
    edit: {
        position: 'absolute',
        top: 20,
        right: 0,
        width: 0,
    },
    editAvatar: {
        background: theme.palette.grey[300],
        transition: theme.transitions.create('background')
    },
    editAvatarHover: {
        background: theme.palette.grey[400],
        transition: theme.transitions.create('background')
    }
})

type Props = {
    tab: Tab
}

type AllProps = Props & WithStyles<typeof styles>

let longTouchTimer = 0

const TabCard: React.FC<AllProps> = props => {
    const [hover, setHover] = React.useState(false)
    const { classes, tab } = props
    const store = React.useContext(context)

    const openEdit = () => store.openModal(tab)

    const handleTouchStart = () => longTouchTimer = window.setTimeout(() => setHover(true), 1500)
    const handleTouchEnd = () => window.clearTimeout(longTouchTimer)

    return (
        <ClickAwayListener onClickAway={() => setHover(false)} >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.container}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <Grid item className={classes.tabNameRow}>
                    <Typography
                        variant="body1"
                        className={classes.tabName}
                        noWrap
                    >
                        {tab.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar className={classes.avatar}>
                        {tab.id}
                    </Avatar>
                    <TabCardEditChip hidden={!hover} onClick={openEdit} />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                        {tab.amount} {tab.currency}
                    </Typography>
                </Grid>
            </Grid>
        </ClickAwayListener >
    )
}

export default withStyles(styles)(TabCard)