// outsource dependencies
import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// local dependencies
import type { AppDispatch, RootState } from '../store';
import { allActionCreators } from "../store/actionCreators";
 
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActionCreators, dispatch);
};
