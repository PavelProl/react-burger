import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    REORDER_INGREDIENTS,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from "../constants/constants";
import { TIngredient } from "../types/data";
import { TIngredientActions } from "../actions/constructor";

type TConstructorState = {
    selectedIngredients: ReadonlyArray<TIngredient>,
    bun: null | TIngredient,

    currentIngredient: null | TIngredient,
    ingredientModalVisible: boolean
};

const initialState: TConstructorState = {
    selectedIngredients: [],
    bun: null,

    currentIngredient: null,
    ingredientModalVisible: false
};

export const constructorReducer = (state = initialState, action: TIngredientActions): TConstructorState => {
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
