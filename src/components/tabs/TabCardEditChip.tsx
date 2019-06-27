import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = (theme: Theme) => createStyles({
    wrapper: {
        position: 'absolute',
        top: '1em',
        right: '1em',
        width: 0,
    },
    hidden: {
        display: 'none'
    },
    icon: {
        color: theme.palette.grey[400],
        transition: theme.transitions.create('color'),
        '&:hover': {
            color: theme.palette.grey[700]
        }
    }
})

type Props = {
    hidden: boolean
    onClick: () => void
}

const TabCardEditChip: React.SFC<Props & WithStyles<typeof styles>> = props => {
    const { classes, hidden, onClick } = props
    return (
        <div className={`${classes.wrapper} ${hidden ? classes.hidden : ''}`}>
            <MoreVertIcon
                className={classes.icon}
                onClick={onClick}
            />
        </div>
    )
}

export default withStyles(styles)(TabCardEditChip)