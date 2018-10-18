import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { InternalError } from 'store/errors/types'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme: Theme) => createStyles({
    error: {
        padding: '10px',
        border: '1px solid',
        width: '100px',
    }
})

type Props = {
    error?: InternalError,
    onClick: () => {}
}

const getText = (error?: InternalError) => error && error.text || ''

const getStackTrace = (error?: InternalError) => error && error.innerError && error.innerError.stack || ''

const Error: React.SFC<Props> = (props: Props & WithStyles<typeof styles>) => {
    const { classes, error, onClick } = props
    return <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        open={error !== undefined}
        autoHideDuration={5000}
        onClose={onClick}
        message={
            <div>
                <span>{getText(error)}</span>
                <span>{getStackTrace(error)}</span>
            </div>

        }
        action={[
            <IconButton key="close" onClick={onClick} color="secondary">
                <CloseIcon />
            </IconButton>
        ]}
    />
}

export default withStyles(styles)(Error)