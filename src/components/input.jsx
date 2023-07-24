
// outsource dependencies
import { FC, useState } from "react";
import { TextInput, View } from "react-native";


const Input = ({ input, meta, label, filter = e => e, outValue, ...attr }) => {
    const [value, setValue] = useState('');
    const inputValue = outValue ? String(outValue) : value;
    const handleChange = (value) => {
        setValue(value);
        input && input.onChange(filter(value));
    };
    return <View>
        <TextInput {...attr} value={inputValue} onChangeText={handleChange} textAlign={'center'}/>
    </View>
};

export default Input;
