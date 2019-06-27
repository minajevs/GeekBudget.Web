import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { InternalError, context } from 'context/errors'

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

const getText = (error: InternalError | null) => error && error.text || ''

const getStackTrace = (error: InternalError | null) => error && error.innerError && error.innerError.stack || ''

const Error: React.FC<WithStyles<typeof styles>> = (props: WithStyles<typeof styles>) => {
    const { classes } = props
    const store = React.useContext(context)

    return <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        open={store.error !== null}
        autoHideDuration={5000}
        onClose={store.dismiss}
        message={
            <div>
                <span>{getText(store.error).toString()}</span>
                <span>{getStackTrace(store.error).toString()}</span>
            </div>
        }
        action={[
            <IconButton key="close" onClick={store.dismiss} color="secondary">
                <CloseIcon />
            </IconButton>
        ]}
    />
}

export default withStyles(styles)(Error)