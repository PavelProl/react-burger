import React, { FunctionComponent } from "react";
import ingredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../services/types/data";

// export interface IIngredient {
//     _id: string;
//     name: string;
//     type: string;
//     proteins: number;
//     fat: number;
//     carbohydrates: number;
//     calories: number;
//     price: number;
//     image: string;
//     image_mobile: string;
//     image_large: string;
//     __v: number;
//     id: string;
// }

type TIngredientProps = {
    count: number;
    item: TIngredient;
    onIngredientClick: any
};

export const Ingredient: FunctionComponent<TIngredientProps> = (props) => {
    const location = useLocation();
    const { count, item, onIngredientClick } = props;
    
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: () => item
    });
    
    return (
        <li className={ingredientStyles.list_item}>
            <Link
                onClick={onIngredientClick}
                ref={dragRef}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
            >
                {count && <Counter count={count} size="default" extraClass="m-1" />}
                <button className={ingredientStyles.ingredient_button}>
                    <img src={item.image} alt={item.name} />
                </button>
                <div className={`${ingredientStyles.price} ${"pt-1 pb-1"}`}>
                    <p className="text text_type_digits-default mr-2">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default pb-8">{item.name}</p>
            </Link>
        </li>
    );
}
