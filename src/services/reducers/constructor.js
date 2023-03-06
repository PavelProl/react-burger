import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    REORDER_INGREDIENTS,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT
} from "../constants/constructor";
import { CLEAR_CONSTRUCTOR } from "../actions/order";

const initialState = {
    selectedIngredients: [],
    bun: null,

    currentIngredient: "",
    ingredientModalVisible: false
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.payload]
            }
        case REORDER_INGREDIENTS:
            const selectedIngredients = [...state.selectedIngredients];
            selectedIngredients.splice(
                action.payload.insertTo,
                0,
                selectedIngredients.splice(action.payload.insertFrom, 1)[0]
            );
            console.log("reorderedIngredients", selectedIngredients)
            return {
                ...state,
                selectedIngredients
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
                return item.id !== action.payload
            });
            return {
                ...state,
                selectedIngredients: [...filteredSelectedIngredients]
            }
        }
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
