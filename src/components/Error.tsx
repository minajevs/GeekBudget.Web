import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Error } from 'store/errors/types'

const styles = (theme: Theme) => createStyles({
    error: {
        padding: '10px'
    }
})

type Props = {
    error: Error
}

const Error: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, error } = props
    return (
        <div className={classes.error}>
            {error.text}
        </div>
    )
}

export default withStyles(styles)(Error)