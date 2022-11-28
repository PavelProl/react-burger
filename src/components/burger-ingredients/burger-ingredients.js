import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";
import { normilizedBuns, normilizedSauce, normilizedFillings } from "../../utils/normalized-data";

export const BurgerIngredients = () => {
    return (
        <section className={ingredientsStyles.ingredients}>

            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <IngredientsTab className="mb-10" />

            {/* скролл-контэйнер */}
            <div className={ingredientsStyles.scroll_container}>
                {/* Булки */}
                <div className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">
                        Булки
                    </h2>
                    <ul className={`${ingredientsStyles.bun_list} ${"ml-4 mr-2"}`}>
                        {normilizedBuns.map(item =>
                            <Ingredient
                                image={item.image}
                                price={item.price} 
                                name={item.name}
                                checked={item.checked} />
                        )}
                    </ul>
                </div>

                {/* Соусы */}
                <div className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">
                        Соусы
                    </h2>
                    <ul className={`${ingredientsStyles.bun_list} ${"ml-4 mr-2"}`}>
                        {normilizedSauce.map(item =>
                            <Ingredient
                                image={item.image}
                                price={item.price} 
                                name={item.name} />
                        )}
                    </ul>
                </div>

                {/* Начинки */}
                <div className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">
                        Начинки
                    </h2>
                    <ul className={`${ingredientsStyles.bun_list} ${"ml-4 mr-2"}`}>
                        {normilizedFillings.map(item =>
                            <Ingredient
                                image={item.image}
                                price={item.price} 
                                name={item.name} />
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
