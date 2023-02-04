import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { forwardRef } from 'react';
import PropTypes from "prop-types";
import { Ingredient } from "../burger-ingredient/burger-ingredient";

export const IngredientsCategory = forwardRef((props, ref) => {
    
    const burgerConstructor = useSelector(store => store.burgerConstructor);

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
        <div className="mb-10">
            <h2 id={props.id} className="text text_type_main-medium mb-6">
                {props.title}
            </h2>
            <ul ref={ref} className={`${ingredientsCategoryStyles.bun_list} ${"ml-4 mr-2"}`}>
                {props.ingredients.map((item, index) => {
                    return (
                        <Ingredient
                            item={item}
                            key={item._id}
                            count={ingredientCounter[item._id]}
                            onIngredientClick={() => props.onIngredientClick(item._id)}
                        />
                    );
                })}
            </ul>
        </div>
    );
});

IngredientsCategory.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    onIngredientClick: PropTypes.func.isRequired
};
