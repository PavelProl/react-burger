import { ADD_INGREDIENT } from "../actions/constructor";

const initialState = {
    selectedIngredients: [],
    selectedIds: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.selectedIngredient],
                selectedIds: [...state.selectedIds, action.selectedIds]
            }
        default: return state
    }
};
