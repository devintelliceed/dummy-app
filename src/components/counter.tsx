
// outsource dependencies
import { useCallback } from "react";
import { Button, Text, View } from "react-native";

// local dependencies
import Input from "./input";
import { useActions, useAppSelector } from "../hooks";

const Counter = () => {
    const { increase, decrease } = useActions();
    const { currentValue } = useAppSelector(state => state.counter);
    // actions
    const handleIncrease = useCallback(()=> increase(1) ,[increase]);
    const handleDecrease = useCallback(()=> decrease(1) ,[decrease]);
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
