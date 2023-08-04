
// outsource dependencies
import { View } from 'react-native';
import { Input } from '@rneui/themed';
import { memo, useState } from 'react';

// local dependencies
import { COLOR } from '../constants/root.theme';

const TextInput = memo(({ value, error, touched, name, disabled, inputStyle, color, ...input }) => {
    const errorText = error?.[name];
    const touchedField = touched?.[name];
    const [isBlur, setIsBlur] = useState(false);
    const isShowError = touchedField && errorText;
    return <View>
        <Input
            value={value}
            editable={disabled}
            autoCapitalize="none"
            onBlur={() => value && setIsBlur(true)}
            selectionColor={COLOR.BLUE.lighten(0.5).hex()}
            errorMessage={(isShowError || isBlur) && errorText}
            inputStyle={isShowError ? { ...inputStyle, color: COLOR.RED.hex() } : inputStyle}
            {...input}
        />
    </View>;
});

export default TextInput;

