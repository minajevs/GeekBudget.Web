import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { Tab } from 'store/tabs/types'

const styles = (theme: Theme) => createStyles({
    tab: {
        display: 'inline-block',
        width: '300px',
        border: '1px dotted'
    },
    field: {
        // paddingBottom: '5px'
    }
})

type Props = {
    defaultTab: Tab
    onSave: (tab: Tab) => void
}

type State = {
    tab: Tab
}

class TabCardForm extends React.Component<Props & WithStyles<typeof styles>, State>{
    state: State = { tab: { ...this.props.defaultTab } }
    render() {
        const { classes, onSave } = this.props
        const { tab } = this.state
        return (
            <>
                <div className={classes.field}>
                    Name:
                    <input type="text" value={tab.name} onChange={this.handleChange('name')} />
                </div>
                <div className={classes.field}>
                    Type:
                    <input type="number" value={tab.type || ''} onChange={this.handleChange('type')} />
                </div>
                <div className={classes.field}>
                    Id:
                    <input type="number" value={tab.id} onChange={this.handleChange('id')} />
                </div>
                <div className={classes.field}>
                    Currency:
                    <input type="text" value={tab.currency} onChange={this.handleChange('currency')} />
                </div>
                <div className={classes.field}>
                    Amount:
                    <input type="number" value={tab.amount} onChange={this.handleChange('amount')} />$
                </div>
                <button onClick={this.onSave}>save</button>
            </>
        )
    }

    onSave = () => {
        this.props.onSave(this.state.tab)
    }

    handleChange = (key: keyof Tab) => (event: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ tab: { ...this.state.tab, [key]: event.currentTarget.value } })
    }
}

export default withStyles(styles)(TabCardForm)