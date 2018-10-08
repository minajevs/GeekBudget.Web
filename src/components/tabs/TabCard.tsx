import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'
import TabCardForm from 'components/tabs/TabCardForm'
import TabCardEditChip from 'components/tabs/TabCardEditChip'

import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'
import EditIcon from '@material-ui/icons/Edit'

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
        fontWeight: 700
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
    onSave: (tab: Tab) => void
}

type State = {
    editing: boolean
    hover: boolean
}

class TabCard extends React.Component<Props & WithStyles<typeof styles>, State>{
    state: State = { editing: false, hover: false }
    render() {
        const { hover } = this.state
        const { classes, tab, onRemove, onSave } = this.props

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.container}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <Grid item>
                    <Typography variant="body1" className={classes.tabName} noWrap>
                        {tab.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar className={classes.avatar}>
                        {tab.id}
                    </Avatar>
                    <TabCardEditChip hidden={!hover} />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                        {tab.amount} {tab.currency}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    handleMouseEnter = () => this.setState({ hover: true })
    handleMouseLeave = () => this.setState({ hover: false })

}

export default withStyles(styles)(TabCard)