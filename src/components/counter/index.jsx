
// outsource dependencies
import { useCallback } from "react";
import { Button, Text, View } from "react-native";

// local dependencies
import Input from "../input";
import { useController } from './controller';

const Counter = () => {
    const [{ currentValue }, { updateData }] = useController();
    // actions
    const handleIncrease = useCallback(()=> updateData({ currentValue: currentValue + 1 }), [currentValue]);
    const handleDecrease = useCallback(()=> updateData({ currentValue: currentValue - 1 }), [currentValue]);
    return <View>
        <Text style={{textAlign: 'center'}}>
            Counter
        </Text>
        <Button title="Increase" onPress={handleIncrease} />
        <Input outValue={currentValue} editable={false} />
        <Button title="Decrease" onPress={handleDecrease} />
    </View>
};
export default Counter;
