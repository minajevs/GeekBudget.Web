import * as React from 'react'

import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'

export type Props = {
    defaultValue: string | number
    shrinkToWidth?: boolean
    type?: 'text' | 'currency'
    onSave: (value: string | number) => void
}

type State = {
    value: string | number
    inputWidth: string
}

const convertToCurrency = (input: string) => {
    const value = input
        // remove all characters that aren't digit or dot
        .replace(/[^0-9.]/g, '')
        // replace multiple subsequent dots with a single dot
        .replace(/\.+/g, '.')
        // removes all dots except for the last one
        .replace(/\.(?=.*\.)/, '')
        // only allow 2 digits after a dot
        .replace(/(.*\.[0-9][0-9]?).*/g, '$1')
        // replace multiple zeros with a single one
        .replace(/^0+(.*)$/, '0$1')
        // remove leading zero
        .replace(/^0([^.].*)$/, '$1')

    return value.length !== 0
        ? value
        : '0'
}

class InputDisplayField extends React.Component<Props & InputBaseProps, State>{
    state: State = { value: this.props.defaultValue, inputWidth: '100%' }
    render() {
        const { value } = this.state
        const { defaultValue, type, shrinkToWidth, onSave, ...otherProps } = this.props
        return (
            <InputBase
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyPress={this.handleKeyPress}
                inputProps={this.getInputProps()}
                value={value}
                {...otherProps}
            />
        )
    }

    getInputProps = () => {
        const { shrinkToWidth, type = 'text' } = this.props
        const { value } = this.state

        const shrinkProps = shrinkToWidth
            ? {
                style: {
                    width: `${this.state.value.toString().length || 1}ch`,
                    maxWidth: '10ch'
                }
            }
            : {}

        return { ...shrinkProps }
    }

    componentWillReceiveProps = (newProps: Props) => {
        if (newProps.defaultValue !== this.state.value) {
            this.setState({ value: newProps.defaultValue })
        }
    }

    handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && this.state.value !== this.props.defaultValue) {
            this.props.onSave(this.state.value)
        }
    }

    handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (this.state.value !== this.props.defaultValue)
            this.props.onSave(this.state.value)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.props.type === 'currency'
            ? convertToCurrency(event.currentTarget.value)
            : event.currentTarget.value
        this.setState({ value })
    }
}

export default InputDisplayField