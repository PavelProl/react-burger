export const OPEN_INGREDIENT = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT = "CLOSE_INGREDIENT";

export function openIngredient(currentIngredient) {
    return {
        type: OPEN_INGREDIENT,
        currentIngredient,
        ingredientModalVisible: true
    }
};

export function closeIngredient() {
    return {
        type: CLOSE_INGREDIENT
    }
};
