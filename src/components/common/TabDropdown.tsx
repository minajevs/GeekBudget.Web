import * as React from 'react'

import { Tab } from 'context/tab/types'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

type Props = {
    name: string
    tabs: Tab[]
    defaultValue: Tab
    onChange: (tab: Tab) => void
    elementProps?: Exclude<FormControlProps, 'value' | 'onChange' | 'inputProps'>
}

const TabDropdown: React.FC<Props> = props => {
    const { name, tabs, defaultValue, onChange, elementProps } = props

    const [state, setState] = React.useState(defaultValue.id)

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = parseInt(event.target.value)
        const newTab = tabs.find(x => x.id === newId)

        setState(newId)
        onChange(newTab!)
    }, [state])

    return (
        <FormControl margin="dense" {...elementProps}>
            <InputLabel htmlFor={'tab-dropdown-' + name.toLowerCase()}>{name}</InputLabel>
            <Select
                value={state}
                onChange={handleChange}
                inputProps={{
                    name: name.toLowerCase(),
                    id: 'tab-dropdown-' + name.toLowerCase()
                }}
            >
                {tabs.map((tab, i) => <MenuItem key={i} value={tab.id}>{tab.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default TabDropdown