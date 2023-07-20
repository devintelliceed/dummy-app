// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";

// configure
interface CounterState {
    currentValue: number;
};

const initialState: CounterState = {
    currentValue: 7,
};

export const counterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        increase: ( state, action ) => {
            state.currentValue = state.currentValue + action.payload
        },
        decrease: ( state, action ) => {
            state.currentValue = state.currentValue - action.payload
        }
    }
});
export default counterSlice.reducer;
