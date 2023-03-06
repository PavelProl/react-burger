import { v4 as uuid } from "uuid";
import { TIngredient } from "../types/data";

import {
    ADD_INGREDIENT,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT
} from "../constants/constructor";

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

export type TIngredientActions =
    | IAddIngredientAction
    | IOpenIngredientAction
    | ICloseIngredient
;

export const addIngredientToConstructor = (ingredient: TIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            id: uuid()
        }
    }
};

export const openIngredient = (currentIngredient: TIngredient) => {
    return {
        type: OPEN_INGREDIENT,
        currentIngredient,
        ingredientModalVisible: true
    }
};

export const closeIngredient = () => {
    return {
        type: CLOSE_INGREDIENT
    }
};
