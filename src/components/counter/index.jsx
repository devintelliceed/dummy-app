
// outsource dependencies
import { useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// local dependencies
import Input from "../input";
import { useActions,  } from "../../hooks";
import { selector, counterSlice, updateData, useController } from './controller';

const Counter = () => {
    const dispatch = useDispatch();
    // const data = useController();
    // const { updateData } = useActions();
    // const [{ currentValue },{ updateData, initialize }] = useController(counterSlice.actions, selector)
    const [{ currentValue },{ updateData, initialize }] = useController()
    // console.log(data,'use cntr data');
    // const { currentValue } = useSelector(state => state.counter);
    // useEffect(() => { initialize(); }, []);
    // actions
    const handleIncrease = useCallback(()=> updateData({ currentValue: currentValue + 1 }), [currentValue]);
    const handleDecrease = useCallback(()=> updateData({ currentValue: currentValue - 1 }), [currentValue]);
    return <View>
        <Text style={{textAlign: 'center'}}>
            Counter
        </Text>
        <Button title="Increase" onPress={handleIncrease} />
        {/* <Button title="Increase" onPress={()=>dispatch({type: 'UPDATE_DATA', payload: 12})} /> */}
        <Input outValue={currentValue} editable={false} />
        <Button title="Decrease" onPress={handleDecrease} />
    </View>
};
export default Counter;
