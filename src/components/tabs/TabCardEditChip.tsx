import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import EditIcon from '@material-ui/icons/Edit'

const styles = (theme: Theme) => createStyles({
    edit: {
        position: 'absolute',
        top: 20,
        right: 0,
        width: 0,
    },
    editHidden: {
        display: 'none'
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
    hidden: boolean
}

type State = {
    hover: boolean
}

class TabCardEditChip extends React.Component<Props & WithStyles<typeof styles>, State>{
    state: State = { hover: false }
    render() {
        const { hover } = this.state
        const { classes, hidden } = this.props

        return (
            <Chip
                avatar={
                    <Avatar
                        className={hover ? classes.editAvatarHover : classes.editAvatar}
                    >
                        <EditIcon />
                    </Avatar>
                }
                variant="default"
                clickable
                className={hidden ? classes.editHidden : classes.edit}
                onMouseEnter={this.handleEditMouseEnter}
                onMouseLeave={this.handleEditMouseLeave}
            />

        )
    }

    handleEditMouseEnter = () => this.setState({ hover: true })
    handleEditMouseLeave = () => this.setState({ hover: false })
}

export default withStyles(styles)(TabCardEditChip)