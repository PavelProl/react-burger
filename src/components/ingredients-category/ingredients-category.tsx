import React, { useMemo, FunctionComponent, ForwardedRef } from "react";
import { useSelector } from "react-redux";
import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { forwardRef } from 'react';
import { Ingredient } from "../burger-ingredient/burger-ingredient";

// import { IIngredient } from "../burger-ingredient/burger-ingredient";
import { TIngredient } from "../../services/types/data";

type TIngredientsCategoryProps = {
    id: string;
    title: string;
    ingredients: Array<TIngredient>;
    onIngredientClick: any;
    ref: ForwardedRef<HTMLUListElement>;
};

export const IngredientsCategory: FunctionComponent<TIngredientsCategoryProps> = forwardRef((props, ref) => {
    
    const burgerConstructor = useSelector((store: any) => store.burgerConstructor);

    const ingredientCounter = useMemo(() => {
        const { bun, selectedIngredients } = burgerConstructor;
        const counters: any = {};
        if (selectedIngredients) {
            selectedIngredients.forEach((ingredient: TIngredient) => {
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
