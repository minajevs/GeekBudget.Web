import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'

const styles = (theme: Theme) => createStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
})

type Props = {
    onClick: () => {}
}

const TabAddButton: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, onClick } = props
    return (
        <div className={classes.wrapper}>
            <Button
                variant="fab"
                aria-label="Add"
                onClick={onClick}
            >
                <AddIcon />
            </Button>
        </div>
    )
}

export default withStyles(styles)(TabAddButton)