import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from "../constants/constants";
import { TData } from "../types/data";
import { getIngredientsApi } from "../../utils/api";
import { AppThunk, AppDispatch } from "../types";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: TData[]
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
};

export const getIngredientsSuccessAction = (ingredients: TData[]): IGetIngredientsSuccessAction => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients
    }
};

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
};

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction());
    getIngredientsApi()
        .then((res: any) => {
            dispatch(getIngredientsSuccessAction(res.data))
        })
        .catch((e) => {
            dispatch(getIngredientsFailedAction())
        })
};
