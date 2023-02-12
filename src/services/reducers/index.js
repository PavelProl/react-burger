import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { currentIngredientReducer } from "./currentIngredient";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    user: userReducer
});
