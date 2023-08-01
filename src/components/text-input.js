

// outsource dependencies
import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as MInput, Text } from '@react-native-material/core';

// local dependencies
import { COLOR } from '../constants/root.theme';

const styles = StyleSheet.create({
    errorText: {
        fontSize: 12
    }
});

const TextInput = memo(({ value, error, touched, name, disabled, inputStyle, color, ...input }) => {
    const errorText = error?.[name];
    const touchedField = touched?.[name];
    const [isBlur, setIsBlur] = useState(false);
    const isShowError = touchedField && errorText;
    return <View>
        <MInput
            value={value}
            editable={disabled}
            autoCapitalize="none"
            onBlur={() => value && setIsBlur(true)}
            color={isShowError ? COLOR.RED.hex() : color}
            selectionColor={COLOR.BLUE.lighten(0.5).hex()}
            inputStyle={isShowError ? { ...inputStyle, color: COLOR.RED.hex() } : inputStyle}
            {...input}
        />
        <Text
            color={COLOR.RED.hex()}
            style={StyleSheet.flatten(styles.errorText, { opacity: errorText ? 1 : 0 })}
        >
            {(isShowError || isBlur) && errorText}
        </Text>
    </View>;
});

export default TextInput;

