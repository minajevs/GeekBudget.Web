import * as React from 'react'
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core'

import { TabType } from 'context/tab/types'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const styles = (theme: Theme) => createStyles({
})

type Props = {
    defaultValue: TabType
    onChange: (value: TabType) => void
}

const handleChange = (callback: (value: TabType) => void) =>
    (event: React.ChangeEvent<HTMLSelectElement>) =>
        callback(parseInt(event.target.value) as TabType)

const TabTypeDropDown: React.FC<Props & WithStyles<typeof styles>> = (props: Props & WithStyles<typeof styles>) => {
    const { defaultValue, onChange } = props

    return <FormControl>
        <InputLabel htmlFor="tab-type">Type</InputLabel>
        <Select
            value={defaultValue}
            onChange={handleChange(onChange)}
        >
            {Object.keys(TabType)
                .filter(x => isNaN(Number(TabType[x])))
                .map((key, index) => (
                    <MenuItem key={index} value={key}>{TabType[key]}</MenuItem>
                ))}
        </Select>
    </FormControl>
}

export default withStyles(styles)(TabTypeDropDown)