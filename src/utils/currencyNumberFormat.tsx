import * as React from 'react'
import NumberFormat from 'react-number-format'

type Props = {
    inputRef: React.Ref<{}>
    onChange: (arg: { target: { value: string } }) => {}
}

const CurrencyNumberFormat: React.SFC<Props> = (props: Props) => {
    const { inputRef, onChange } = props;

    return (
        <NumberFormat
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$"

        />
    )
}

export default CurrencyNumberFormat