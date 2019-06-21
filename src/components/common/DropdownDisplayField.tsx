import * as React from 'react'

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export type Option = {
    text: string
    value: number | string
}

export type Props = {
    defaultValue: number | string
    options: Option[]
    onSave: (value: number | string) => void
}

type State = {
    value: number | string
    anchor: HTMLElement | null
}

class DropdownDisplayField extends React.Component<Props, State>{
    state: State = { value: this.props.defaultValue, anchor: null }
    render() {
        const { options } = this.props
        const { anchor, value } = this.state

        const selectedOption = options.find(x => x.value === value)
        const titleText = selectedOption !== undefined
            ? selectedOption.text
            : '--'
        return (
            <>
                <div onClick={this.handleTextClick}>
                    {titleText}
                </div>
                <Menu
                    anchorEl={anchor}
                    open={anchor !== null}
                    onClose={this.handleMenuClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            selected={value === option.value}
                            onClick={this.handleMenuItemClick(option.value)}
                        >
                            {option.text}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        )
    }

    componentWillReceiveProps = (newProps: Props) => {
        if (newProps.defaultValue !== this.state.value) {
            this.setState({ value: newProps.defaultValue })
        }
    }

    handleTextClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchor: event.currentTarget })
    }

    handleMenuClose = () => {
        this.setState({ anchor: null })
    }

    handleMenuItemClick = (value: number | string) => (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ value, anchor: null })
        this.props.onSave(value)
    }
}

export default DropdownDisplayField