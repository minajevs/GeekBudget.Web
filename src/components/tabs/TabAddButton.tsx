import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Fab from '@material-ui/core/Fab'

import AddIcon from '@material-ui/icons/Add'

const styles = (theme: Theme) => createStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
})

type Props = {
    onClick: () => void
}

const TabAddButton: React.SFC<Props & WithStyles<typeof styles>> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, onClick } = props
    return (
        <div className={classes.wrapper}>
            <Fab
                aria-label="Add"
                onClick={onClick}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default withStyles(styles)(TabAddButton)