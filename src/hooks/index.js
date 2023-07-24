
// outsource dependencies
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// local dependencies
import { allActionCreators } from "../store/actionCreators";
 
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreators, dispatch);
};

export const useControllerCreator = (actions, selector) => {
    const dispatch = useDispatch();
    const state = useSelector(selector);
    return [
       { ...state },
       {...bindActionCreators({ ...actions }, dispatch)}
    ];
};
