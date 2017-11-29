import * as React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import './styles.css';

interface Props {
    onSave: (value: string) => void;
    defaultValue: string;
    helpText?: string;
}

interface State {
    hovering: boolean;
    editing: boolean;
    value: string;
}

const style = ({
    inkbar: { height: '1px' }
});

class InlineEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hovering: false,
            editing: false,
            value: props.defaultValue
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.target.value,
        });
    }

    onHoverEnter = () => this.setState({ hovering: true });

    onHoverLeave = () => this.setState({ hovering: false });

    onFocus = () => {
        this.setState({ editing: true });
    }

    onBlur = () => {
        this.setState({ editing: false });
        this.props.onSave(this.state.value);
    }

    onKey = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.keyCode === 13){
            event.currentTarget.blur();
        }
    }

    render() {
        const { hovering, editing } = this.state;
        const { helpText, defaultValue } = this.props;
        return (
            < TextField
                label={helpText}
                value={this.state.value}
                onChange={this.handleChange}
                onMouseEnter={this.onHoverEnter}
                onMouseLeave={this.onHoverLeave}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                InputProps={{
                    disableUnderline: !hovering && !editing,
                    classes: {inkbar: 'custom-inkbar'},
                    onKeyDown: this.onKey
                }}
                margin="none"
                fullWidth
                autoFocus
            />);
    }
}

export default InlineEdit;