import { ADD_INGREDIENT } from "../actions/constructor";
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
        default: return state
    }
};
