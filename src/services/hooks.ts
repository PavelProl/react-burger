import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from "./types/index";

// данный вариант не работал, пока оставил закомментированным
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useDispatch = () => useAppDispatch<AppDispatch>()

// знакомим хук со структурой хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
