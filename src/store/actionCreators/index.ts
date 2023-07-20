// local dependencies
import { counterSlice } from "../reducers/counter";

export const allActionCreators = {
    ...counterSlice.actions,
};
