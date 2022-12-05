import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";

import PropTypes from "prop-types";

export const BurgerIngredients = (props) => {

    const ingredientsNames = [
        "Булки", "Соусы", "Начинки"
    ];

    const ingredientTypes = {
        "Булки": "bun",
        "Начинки": "main",
        "Соусы": "sauce"
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
                    const filtered = props.data.data.filter(item => {
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
                                            image={item.image}
                                            price={item.price}
                                            name={item.name}
                                            checked={item.checked}
                                            onClick={(e) => props.onClick(e, item)} />
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
