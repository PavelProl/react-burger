import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from "../actions/currentIngredient";

const initialState = {
    currentIngredient: "",
    ingredientModalVisible: false
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.currentIngredient,
                ingredientModalVisible: true
            }
        case CLOSE_INGREDIENT:
            return {
                ...state,
                ingredientModalVisible: false
            }
        default: return state
    }
};
