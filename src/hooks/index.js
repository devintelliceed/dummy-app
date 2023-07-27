
// outsource dependencies
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const useControllerCreator = (actions, selector) => {
    const dispatch = useDispatch();
    const state = useSelector(selector);
    return [
       { ...state },
       {...bindActionCreators({ ...actions }, dispatch)}
    ];
};
