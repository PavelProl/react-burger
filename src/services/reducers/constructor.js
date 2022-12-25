import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/constructor";
import { CLEAR_CONSTRUCTOR } from "../actions/order";

const initialState = {
    selectedIngredients: [],
    bun: null
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    bun: action.payload.bun
                }
            }
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.payload.selectedIngredients]
            }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                selectedIngredients: initialState.selectedIngredients,
                bun: initialState.bun
            }
        }
        case DELETE_INGREDIENT: {
            const filteredSelectedIngredients = state.selectedIngredients.filter(item => {
                return item._id !== action.payload
            });
            return {
                ...state,
                selectedIngredients: [...filteredSelectedIngredients]
            }
        }
        default: return state
    }
};
