import { ADD_INGREDIENT } from "../actions/constructor";
import { ADD_BUN } from "../actions/constructor";
import { CLEAR_CONSTRUCTOR } from "../actions/order";

const initialState = {
    selectedIngredients: [],
    selectedIds: [],
    buns: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.selectedIngredient],
                selectedIds: [...state.selectedIds, action.selectedIds]
            }
        case ADD_BUN:
            return {
                ...state,
                buns: [...state.buns, action.bun]
            }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                selectedIngredients: initialState.selectedIngredients,
                selectedIds: initialState.selectedIds,
                buns: initialState.buns
            }
        }
        default: return state
    }
};
