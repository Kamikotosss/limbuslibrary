import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers/root-reducer";

export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector;