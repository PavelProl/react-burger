import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";

import PropTypes from "prop-types";

import { ADD_INGREDIENT, ADD_BUN } from "../../services/actions/constructor";
import { OPEN_INGREDIENT } from "../../services/actions/currentIngredient";

export const BurgerIngredients = () => {
    const dispatch = useDispatch();

    // получаю ингредиенты и выбранные в конструктор ингредиенты
    const data = useSelector(store => store.ingredients.ingredients);
    const buns = useSelector(store => store.burgerConstructor.buns);
    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);

    const ingredientsNames = [
        "Булки", "Соусы", "Начинки"
    ];

    const ingredientTypes = {
        "Булки": "bun",
        "Начинки": "main",
        "Соусы": "sauce"
    };
        
    const onIngredientClick = (id) => {
        const ingredient = data.find(item => item._id === id);
        if (selectedIngredients.length === 0 && ingredient.type === "bun" && buns.length === 0) {
            dispatch({
                type: ADD_BUN,
                bun: ingredient
            });
            dispatch({
                type: ADD_INGREDIENT,
                selectedIngredient: ingredient,
                selectedIds: id
            });
            dispatch({
                type: OPEN_INGREDIENT,
                currentIngredient: ingredient,
                ingredientModalVisible: true
            });
        } else if (selectedIngredients.length !== 0) {
            dispatch({
                type: ADD_INGREDIENT,
                selectedIngredient: ingredient,
                selectedIds: id
            });
            dispatch({
                type: OPEN_INGREDIENT,
                currentIngredient: ingredient,
                ingredientModalVisible: true
            });
        } else {
            return;
        }
    };

    return (
        <section className={ingredientsStyles.ingredients}>

            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <IngredientsTab names={ingredientsNames} />

            {/* СКРОЛЛ-КОНТЭЙНЕР */}
            <div className={ingredientsStyles.scroll_container}>

                {/* ИНГРЕДИЕНТЫ */}
                {ingredientsNames.map(ingredient => {

                    // получаю отфильтрованный ингредиент по названию (булки, начинки, соусы)
                    const filtered = data.filter(item => {
                        return item.type === ingredientTypes[ingredient]
                    });
                    
                    return (
                        <div key={ingredient} className="mb-10">
                            <h2 className="text text_type_main-medium mb-6">
                                {ingredient}
                            </h2>
                            <ul className={`${ingredientsStyles.bun_list} ${"ml-4 mr-2"}`}>
                                {filtered.map(item => {
                                    return (
                                        <Ingredient
                                            key={item._id}
                                            type={item.type}
                                            image={item.image}
                                            price={item.price}
                                            name={item.name}
                                            checked={item.checked}
                                            onClick={() => onIngredientClick(item._id)}
                                        />
                                    )})}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}

Ingredient.propTypes = {
    onClick: PropTypes.func
};
