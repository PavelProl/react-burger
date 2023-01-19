import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { Ingredient } from "../burger-ingredient/burger-ingredient";
import { forwardRef } from 'react';

export const IngredientsCategory = forwardRef(({
    id,
    title,
    ingredients,
    onIngredientClick
}, ref) => {
    
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
            <h2 id={id} className="text text_type_main-medium mb-6">
                {title}
            </h2>
            <ul ref={ref} className={`${ingredientsCategoryStyles.bun_list} ${"ml-4 mr-2"}`}>
                {ingredients.map((item, index) => {
                    return (
                        <Ingredient
                            item={item}
                            key={item._id}
                            id={item._id}
                            type={item.type}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            count={ingredientCounter[item._id]}
                            onIngredientClick={() => onIngredientClick(item._id)}
                        />
                    );
                })}
            </ul>
        </div>
    );
});
