import { request } from "../../utils/api";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from "../constants/constructor";
import { TData } from "../types/data";
import { getIngredientsApi } from "../../utils/api";

export interface IGetIngredientsAction {
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
    | IGetIngredientsAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
;

export const getIngredientsAction = (): IGetIngredientsAction => {
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

export const getIngredients = () => {
    return function(dispatch: any) {
        dispatch(getIngredientsAction());
        getIngredientsApi()
            .then((res: any) => {
                dispatch(getIngredientsSuccessAction(res.data))
            })
            .catch((e) => {
                dispatch(getIngredientsFailedAction())
            })
    }
};
