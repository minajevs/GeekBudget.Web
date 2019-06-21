import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
    master: {
        backgroundColor: theme.palette.background.default,
        height: '100vh'
    }
})

type Props = {
    children: React.ReactNode
}

const Master: React.SFC<Props & WithStyles<typeof styles>> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, children } = props
    return (
        <div className={classes.master}>
            {children}
        </div>
    )
}

export default withStyles(styles)(Master)