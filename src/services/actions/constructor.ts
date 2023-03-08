import { v4 as uuid } from "uuid";
import { TIngredient } from "../types/data";

import {
    ADD_INGREDIENT,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from "../constants/constants";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    payload: TIngredient
}

export interface IOpenIngredientAction {
    readonly type: typeof OPEN_INGREDIENT;
    currentIngredient: TIngredient;
}

export interface ICloseIngredient {
    readonly type: typeof CLOSE_INGREDIENT;
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TIngredientActions =
    | IAddIngredientAction
    | IOpenIngredientAction
    | ICloseIngredient
;

export const addIngredientToConstructorAction = (ingredient: TIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            id: uuid()
        }
    }
};

export const openIngredientAction = (currentIngredient: TIngredient) => {
    return {
        type: OPEN_INGREDIENT,
        currentIngredient,
        ingredientModalVisible: true
    }
};

export const closeIngredientAction = () => {
    return {
        type: CLOSE_INGREDIENT
    }
};

export const clearConstructorAction = () => {
    return {
        type: CLEAR_CONSTRUCTOR
    }
};
