import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Redux/store/rootReducer";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
