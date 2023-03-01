import { v4 as uuid } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const REORDER_INGREDIENTS = "REORDER_INGREDIENTS";

export const addIngredientToConstructor = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            id: uuid()
        }
    }
};
