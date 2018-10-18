import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'
import TabCardEditChip from 'components/tabs/TabCardEditChip'

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
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
    onRemove: () => void
    onEdit: () => void
}

type AllProps = Props & WithStyles<typeof styles>

const TabCard: React.SFC<AllProps> = (props: AllProps) => {
    const { classes, tab, onRemove, onEdit } = props

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.container}
        >
            <Grid item>
                <Typography
                    variant="body1"
                    className={classes.tabName}
                    noWrap
                    onClick={onEdit}
                >
                    {tab.name}
                </Typography>
            </Grid>
            <Grid item>
                <Avatar className={classes.avatar}>
                    {tab.id}
                </Avatar>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">
                    {tab.amount} {tab.currency}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(TabCard)