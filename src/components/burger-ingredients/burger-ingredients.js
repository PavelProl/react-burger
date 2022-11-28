import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";
import { normilizedBuns, normilizedSauce, normilizedFillings } from "../../utils/normalized-data";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredients = () => {
    return (
        <section className={ingredientsStyles.ingredients}>

            {/* контэйнер */}
            <div className={ingredientsStyles.container}>

                <h1 className="text text_type_main-large mb-5">
                    Соберите бургер
                </h1>
                <IngredientsTab className="mb-10" />

                {/* Булки */}
                <div className="mb-10 pl-4 pr-4">
                    <h2 className="text text_type_main-medium mb-6">
                        Булки
                    </h2>
                    <ul className={ingredientsStyles.bun_list}>
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
                <div className="mb-10 pl-4 pr-4">
                    <h2 className="text text_type_main-medium mb-6">
                        Соусы
                    </h2>
                    <ul className={ingredientsStyles.bun_list}>
                        {normilizedSauce.map(item =>
                            <Ingredient
                                image={item.image}
                                price={item.price} 
                                name={item.name} />
                        )}
                    </ul>
                </div>

                {/* Начинки */}
                <div className="mb-10 pl-4 pr-4">
                    <h2 className="text text_type_main-medium mb-6">
                        Начинки
                    </h2>
                    <ul className={ingredientsStyles.bun_list}>
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
