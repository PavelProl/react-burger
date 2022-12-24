import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

import { ADD_INGREDIENT } from "../../services/actions/constructor";
import { OPEN_INGREDIENT } from "../../services/actions/currentIngredient";

export const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.ingredients.ingredients);
    const burgerConstructor = useSelector(store => store.burgerConstructor);

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
            dispatch({
                type: ADD_INGREDIENT,
                payload: {
                    type: ingredient.type,
                    bun: ingredient,
                    selectedIngredients: ingredient
                }
            });
            dispatch({
                type: OPEN_INGREDIENT,
                currentIngredient: ingredient,
                ingredientModalVisible: true
            });
    };

    const ingredientCounter = useMemo(() => {
        const { bun, selectedIngredients } = burgerConstructor;
        const counters = {};
        if (selectedIngredients) {
            selectedIngredients.forEach((ingredient) => {
                if (!counters[ingredient._id]) {
                    counters[ingredient._id] = 0
                }
                counters[ingredient._id]++
            });
        }
        if (bun) {
            counters[bun._id] = 2
        };
        return counters;
    }, [burgerConstructor]);

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
                                            count={ingredientCounter[item._id]}
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
