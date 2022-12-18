import React, { useEffect, useContext } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import { Ingredient } from "../burger-ingredient/burger-ingredient";

import PropTypes from "prop-types";

import { DataContext, IdsContext, PriceContext } from "../../services/appContext";

export const BurgerIngredients = (props) => {

    // получаю данные и функцию добавления ids в массив выбранных ids
    const { data } = useContext(DataContext);
    const { setSelectedIds } = useContext(IdsContext);
    const { selectedIngredients, setSelectedIngredients } = useContext(DataContext);
    const { setFinalPrice } = useContext(PriceContext);

    const ingredientsNames = [
        "Булки", "Соусы", "Начинки"
    ];

    const ingredientTypes = {
        "Булки": "bun",
        "Начинки": "main",
        "Соусы": "sauce"
    };
        
    // добавляю id в массив selectedIds
    // и ингредиент в массив selectedIngredients
    const onIdsClick = (id) => {
        setSelectedIds((selectedIds) => [...selectedIds, id]);
        setSelectedIngredients((selectedIngredients) => {
            const ingredient = data.find(item => item._id === id);
            return [...selectedIngredients, ingredient];
        });
    };

    // рассчитываю итоговую стоимость
    useEffect(
        () => {
          let total = 0;
          selectedIngredients.map(item => (total += item["price"]));
          setFinalPrice(total);
        },
        [selectedIngredients, setFinalPrice]
    );

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
                                            onClick={(e) => {
                                                props.onClick(e, item);
                                                onIdsClick(item._id)
                                            }} />
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
