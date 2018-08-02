import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Error } from 'store/errors/types'
import { CSSProperties } from '../../node_modules/@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
    error: {
        padding: '10px',
        border: '1px solid'
    } as CSSProperties
})

type Props = {
    error?: Error,
    onClick: () => {}
}

const Error: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, error, onClick } = props
    return error !== undefined 
    ? (
        <div className={classes.error} onClick={onClick}>
            {error.text}
        </div>
    )
    : null
}

export default withStyles(styles)(Error)