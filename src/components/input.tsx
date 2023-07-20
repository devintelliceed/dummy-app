
// outsource dependencies
import { FC, useState } from "react";
import { TextInput, View } from "react-native";

type Filter = (e:any) => typeof e;
interface InputProps {
    meta?: object;
    label?: string;
    filter?: Filter;
    outValue?: number,
    editable?: boolean;
    selectTextOnFocus?: boolean;
    input?: {
        onChange: (e:Filter) => {}
    };
}

const Input: FC<InputProps> = ({ input, meta, label, filter = e => e, outValue, ...attr }) => {
    const [value, setValue] = useState('0');
    const handleChange = (value:string) => {
        setValue(value);
        input && input.onChange(filter(value));
    };
    return <View>
        <TextInput {...attr} value={String(outValue) || value} onChangeText={handleChange} textAlign={'center'}/>
    </View>
};

export default Input;
