import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";
import { normilizedBuns, normilizedSauce, normilizedFillings } from "../../utils/normalized-data";

export const BurgerIngredients = () => {

    // пока сделал так. Думаю, в дальнейшем логика получения названий поправится
    const ingredientsNames = [
        "Булки", "Соусы", "Начинки"
    ];

    const ingredientEntities = {
        "Булки": normilizedBuns,
        "Соусы": normilizedSauce,
        "Начинки": normilizedFillings
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
                    return (
                        <div className="mb-10">
                            <h2 className="text text_type_main-medium mb-6">
                                {ingredient}
                            </h2>
                            <ul className={`${ingredientsStyles.bun_list} ${"ml-4 mr-2"}`}>
                                {ingredientEntities[ingredient].map(item => {
                                    return (
                                        <Ingredient
                                        // проблема с данным key
                                        // выдает ошибку
                                            key={item._id}
                                            image={item.image}
                                            price={item.price}
                                            name={item.name}
                                            checked={item.checked} />
                                    )})}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}
